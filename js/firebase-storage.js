// Firebase Storage wrapper - syncs data across devices
// Falls back to localStorage if Firebase is not configured

(function() {
  let db = null;
  let auth = null;
  let currentUser = null;
  let isInitializing = false;
  let initPromise = null;
  
  // Initialize Firebase (called when both config and SDK are ready)
  async function initializeFirebase() {
    if (isInitializing) return initPromise;
    if (db !== null) return Promise.resolve(true);
    
    isInitializing = true;
    initPromise = new Promise(async (resolve) => {
      try {
        // Check if Firebase config exists
        if (typeof firebaseConfig === 'undefined') {
          console.log('Firebase not configured - using localStorage only');
          isInitializing = false;
          resolve(false);
          return;
        }
        
        // Wait for Firebase SDK to load
        if (typeof firebase === 'undefined') {
          console.log('Waiting for Firebase SDK to load...');
          // Wait up to 5 seconds for Firebase to load
          let attempts = 0;
          while (typeof firebase === 'undefined' && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
          }
          
          if (typeof firebase === 'undefined') {
            console.error('Firebase SDK not loaded - using localStorage only');
            isInitializing = false;
            resolve(false);
            return;
          }
        }
        
        // Initialize Firebase
        try {
          firebase.initializeApp(firebaseConfig);
          db = firebase.firestore();
          auth = firebase.auth();
          
          // Enable offline persistence
          db.enablePersistence().catch(err => {
            if (err.code === 'failed-precondition') {
              console.warn('Firebase persistence requires single tab');
            } else if (err.code === 'unimplemented') {
              console.warn('Firebase persistence not supported in this browser');
            }
          });
          
          // Use anonymous authentication
          await auth.signInAnonymously();
          currentUser = auth.currentUser;
          
          console.log('✅ Firebase connected - data will sync across devices');
          isInitializing = false;
          resolve(true);
        } catch (initError) {
          console.error('Firebase initialization error:', initError);
          db = null;
          auth = null;
          isInitializing = false;
          resolve(false);
        }
      } catch (error) {
        console.error('Firebase setup error:', error);
        db = null;
        auth = null;
        isInitializing = false;
        resolve(false);
      }
    });
    
    return initPromise;
  }
  
  // Auto-initialize when both config and SDK are ready
  function tryAutoInit() {
    if (typeof firebaseConfig !== 'undefined' && typeof firebase !== 'undefined') {
      initializeFirebase();
    }
  }
  
  // Try initialization immediately
  if (typeof firebaseConfig !== 'undefined') {
    if (typeof firebase !== 'undefined') {
      initializeFirebase();
    } else {
      // Wait for Firebase SDK to load
      window.addEventListener('load', tryAutoInit);
      // Also try after a short delay
      setTimeout(tryAutoInit, 500);
    }
  }
  
  // Helper to get user-specific collection path
  function getUserPath() {
    if (currentUser) {
      return `users/${currentUser.uid}`;
    }
    // Fallback: use a default user ID stored in localStorage
    let userId = localStorage.getItem('tp:userId');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
      localStorage.setItem('tp:userId', userId);
    }
    return `users/${userId}`;
  }
  
  // Firebase Storage wrapper
  const FirebaseStorage = {
    // Get students (sync version that uses cache)
    getStudents() {
      if (db && currentUser && this._studentsCache !== null) {
        return this._studentsCache;
      }
      return this.getStudentsLocal();
    },
    
    // Get students async (for initialization)
    async getStudentsAsync() {
      if (db && currentUser) {
        try {
          const doc = await db.collection(getUserPath()).doc('students').get();
          const students = doc.exists ? doc.data().students : [];
          this._studentsCache = students;
          // Also sync to localStorage as backup
          this.saveStudentsLocal(students);
          return students;
        } catch (error) {
          console.error('Firebase getStudents error:', error);
          return this.getStudentsLocal();
        }
      }
      return this.getStudentsLocal();
    },
    
    // Save students (fire-and-forget async)
    saveStudents(students) {
      // Update cache immediately
      this._studentsCache = students;
      // Save to localStorage immediately
      this.saveStudentsLocal(students);
      // Save to Firebase in background
      if (db && currentUser) {
        db.collection(getUserPath()).doc('students').set({ students })
          .catch(error => console.error('Firebase saveStudents error:', error));
      }
    },
    
    // Get sessions by week (sync version that uses cache)
    getSessionsByWeek(weekKey) {
      if (db && currentUser && this._sessionsCache !== null) {
        return this._sessionsCache[weekKey] || [];
      }
      return this.getSessionsByWeekLocal(weekKey);
    },
    
    // Get sessions async (for initialization)
    async getSessionsByWeekAsync(weekKey) {
      if (db && currentUser) {
        try {
          const doc = await db.collection(getUserPath()).doc('sessions').get();
          const all = doc.exists ? doc.data().sessions : {};
          if (!this._sessionsCache) this._sessionsCache = {};
          this._sessionsCache[weekKey] = all[weekKey] || [];
          return this._sessionsCache[weekKey];
        } catch (error) {
          console.error('Firebase getSessionsByWeek error:', error);
          return this.getSessionsByWeekLocal(weekKey);
        }
      }
      return this.getSessionsByWeekLocal(weekKey);
    },
    
    // Save sessions by week (fire-and-forget async)
    saveSessionsByWeek(weekKey, sessions) {
      // Update cache immediately
      if (!this._sessionsCache) this._sessionsCache = {};
      this._sessionsCache[weekKey] = sessions;
      // Save to localStorage immediately
      this.saveSessionsByWeekLocal(weekKey, sessions);
      // Save to Firebase in background
      if (db && currentUser) {
        db.collection(getUserPath()).doc('sessions').get()
          .then(doc => {
            const all = doc.exists ? doc.data().sessions : {};
            all[weekKey] = sessions;
            return db.collection(getUserPath()).doc('sessions').set({ sessions: all });
          })
          .catch(error => console.error('Firebase saveSessionsByWeek error:', error));
      }
    },
    
    // Get all weeks (sync version)
    getAllWeeks() {
      if (db && currentUser && this._sessionsCache !== null) {
        return Object.keys(this._sessionsCache).sort();
      }
      return this.getAllWeeksLocal();
    },
    
    // Initialize cache from Firebase
    async initCache() {
      if (db && currentUser) {
        try {
          this._studentsCache = await this.getStudentsAsync();
          const doc = await db.collection(getUserPath()).doc('sessions').get();
          const all = doc.exists ? doc.data().sessions : {};
          this._sessionsCache = all;
          // Sync to localStorage
          this.saveStudentsLocal(this._studentsCache);
          for (const [weekKey, sessions] of Object.entries(all)) {
            this.saveSessionsByWeekLocal(weekKey, sessions);
          }
        } catch (error) {
          console.error('Firebase initCache error:', error);
        }
      }
    },
    
    // Cache storage
    _studentsCache: null,
    _sessionsCache: null,
    
    // LocalStorage fallback methods
    getStudentsLocal() {
      try {
        const raw = localStorage.getItem('tp:students');
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    },
    
    saveStudentsLocal(students) {
      try {
        localStorage.setItem('tp:students', JSON.stringify(students));
      } catch (error) {
        console.error('localStorage saveStudents error:', error);
      }
    },
    
    getSessionsByWeekLocal(weekKey) {
      try {
        const raw = localStorage.getItem('tp:sessions');
        const all = raw ? JSON.parse(raw) : {};
        return all[weekKey] || [];
      } catch {
        return [];
      }
    },
    
    saveSessionsByWeekLocal(weekKey, sessions) {
      try {
        const raw = localStorage.getItem('tp:sessions');
        const all = raw ? JSON.parse(raw) : {};
        all[weekKey] = sessions;
        localStorage.setItem('tp:sessions', JSON.stringify(all));
      } catch (error) {
        console.error('localStorage saveSessionsByWeek error:', error);
      }
    },
    
    getAllWeeksLocal() {
      try {
        const raw = localStorage.getItem('tp:sessions');
        const all = raw ? JSON.parse(raw) : {};
        return Object.keys(all).sort();
      } catch {
        return [];
      }
    },
    
    // Check if Firebase is active
    isFirebaseActive() {
      return db !== null && currentUser !== null;
    },
    
    // Wait for auth to complete
    async waitForAuth() {
      // First ensure Firebase is initialized
      await initializeFirebase();
      if (!auth) return false;
      if (currentUser) return true;
      return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          currentUser = user;
          unsubscribe();
          resolve(user !== null);
        });
        // Timeout after 5 seconds
        setTimeout(() => {
          unsubscribe();
          resolve(false);
        }, 5000);
      });
    },
    
    // Initialize Firebase (public method)
    async init() {
      return await initializeFirebase();
    }
  };
  
  // Export
  window.FirebaseStorage = FirebaseStorage;
})();

