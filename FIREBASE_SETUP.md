# Firebase Setup for Cross-Device Sync

To enable data sync across all your devices, follow these steps:

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard (you can disable Google Analytics if you don't need it)

## Step 2: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select "Start in test mode" (for personal use)
4. Choose a location (choose closest to you)
5. Click "Enable"

## Step 3: Enable Anonymous Authentication

1. Go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Anonymous" authentication
5. Click "Save"

## Step 4: Get Your Firebase Config

1. Go to Project Settings (gear icon) > General tab
2. Scroll down to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Register your app (you can name it anything)
5. Copy the `firebaseConfig` object

## Step 5: Configure the App

1. Open `js/firebase-config.js` in your project
2. Uncomment the `firebaseConfig` object
3. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 6: Add Firebase SDK to Your Pages

Add these script tags to the `<head>` section of each HTML page (before `globals.js`):

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"></script>
```

## Step 7: Deploy

After configuring, commit and push to GitHub. Your data will now sync across all devices!

## Security Rules (Important!)

After testing, update your Firestore security rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

This ensures only you can access your data.

## Troubleshooting

- **Data not syncing?** Check browser console for errors
- **Can't connect?** Make sure Firestore and Anonymous Auth are enabled
- **Still using localStorage?** Check that `firebase-config.js` is properly configured

