// Local storage wrapper and data schema

const KEY_STUDENTS = 'tp:students'; // array of {id, name, grade, rate, color}
const KEY_SESSIONS = 'tp:sessions'; // map weekKey -> array of sessions
// session: { id, studentId, dateISO, startTime, endTime, title, notes, materials, zoomLink }

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const Storage = {
  getStudents() { return read(KEY_STUDENTS, []); },
  saveStudents(students) { write(KEY_STUDENTS, students); },
  upsertStudent(student) {
    const students = read(KEY_STUDENTS, []);
    const idx = students.findIndex(s => s.id === student.id);
    if (idx >= 0) students[idx] = student; else students.push(student);
    write(KEY_STUDENTS, students);
  },
  getSessionsByWeek(weekKey) { const all = read(KEY_SESSIONS, {}); return all[weekKey] || []; },
  saveSessionsByWeek(weekKey, sessions) {
    const all = read(KEY_SESSIONS, {});
    all[weekKey] = sessions;
    write(KEY_SESSIONS, all);
  },
  getAllWeeks() {
    const all = read(KEY_SESSIONS, {});
    return Object.keys(all).sort();
  },
};

