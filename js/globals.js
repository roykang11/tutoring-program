// Global helpers (no modules needed)
(function(){
  const App = {
    getMonday(date){
    const d = new Date(date);
    const day = d.getDay();
      const diff = (day === 0 ? -6 : 1) - day;
      d.setDate(d.getDate() + diff);
      d.setHours(0,0,0,0);
      return d;
  },
    getSunday(date){
    const d = new Date(date);
    const day = d.getDay();
      const diff = -day; // Sunday is day 0, so we subtract the current day
      d.setDate(d.getDate() + diff);
      d.setHours(0,0,0,0);
      return d;
  },
    formatDateShort(d){
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    },
    getWeekKey(date){
      const sunday = App.getSunday(date);
      return `week:${App.formatDateShort(sunday)}`;
    },
    addDays(date, n){ const d = new Date(date); d.setDate(d.getDate()+n); return d; },
    hoursBetween(startIso, endIso){ 
      const a = new Date(startIso);
      let b = new Date(endIso);
      
      // If end time appears to be earlier than start time (e.g., 22:30 to 00:30),
      // it means the end time is on the next day
      if (b.getTime() < a.getTime()) {
        // Add one day to the end time
        b.setDate(b.getDate() + 1);
      }
      
      return Math.max(0, (b.getTime() - a.getTime()) / 36e5); 
    },
    currency(n){ return new Intl.NumberFormat(undefined,{style:'currency',currency:'USD'}).format(n||0); },
    currencyWon(n){ return `₩${Math.floor(n||0).toLocaleString()}`; },
    byId(id){ return document.getElementById(id); },
    readQuery(key){ const p=new URLSearchParams(location.search); return p.get(key); },
    uid(prefix='id'){ return `${prefix}_${Math.random().toString(36).slice(2,9)}`; },
    on(parent, event, selector, handler){ parent.addEventListener(event,(e)=>{ const t=e.target.closest(selector); if(t && parent.contains(t)) handler(e,t); }); }
};
  window.App = App;

  const KEY_STUDENTS = 'tp:students';
  const KEY_SESSIONS = 'tp:sessions';
  function read(key, fallback){ try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; } }
  function write(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
  const Storage = {
    getStudents(){ return read(KEY_STUDENTS, []); },
    saveStudents(students){ write(KEY_STUDENTS, students); },
    upsertStudent(student){ const arr=read(KEY_STUDENTS,[]); const i=arr.findIndex(s=>s.id===student.id); if(i>=0) arr[i]=student; else arr.push(student); write(KEY_STUDENTS,arr); },
    getSessionsByWeek(weekKey){ const all=read(KEY_SESSIONS,{}); return all[weekKey]||[]; },
    saveSessionsByWeek(weekKey, sessions){ const all=read(KEY_SESSIONS,{}); all[weekKey]=sessions; write(KEY_SESSIONS, all); },
    getAllWeeks(){ const all=read(KEY_SESSIONS,{}); return Object.keys(all).sort(); },
  };
  window.Storage = Storage;
})();


