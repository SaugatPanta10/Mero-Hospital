/* =========================================================
   patient_dashboard.js  — 100% standalone, no base needed
   ========================================================= */

/* ── DATA ──────────────────────────────────────────────── */
const REMINDERS = [
  {
    id: 1,
    title: 'Blood Pressure Logging Due',
    text: "You haven't logged your morning readings yet. Please take a moment to update your logs.",
    time: '2 hours ago',
    type: 'warning',
  },
  {
    id: 2,
    title: 'Vaccination Update',
    text: 'Your annual flu shot is recommended this month. Check available slots.',
    time: 'Yesterday',
    type: 'info',
  },
];

const RECORDS = [
  { id: 1, name: 'X-Ray Report',       date: 'Oct 12, 2023', icon: 'doc'  },
  { id: 2, name: 'Physiotherapy Note', date: 'Sep 28, 2023', icon: 'note' },
];

/* ── SVG ICONS ─────────────────────────────────────────── */
const ICON = {
  warning: `
    <svg viewBox="0 0 24 24" fill="none" stroke="#e02424" stroke-width="2" width="22" height="22">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8"  x2="12"   y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>`,

  info: `
    <svg viewBox="0 0 24 24" fill="none" stroke="#1a56db" stroke-width="2" width="22" height="22">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>`,

  doc: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>`,

  note: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8"  y2="13"/>
      <line x1="16" y1="17" x2="8"  y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>`,

  download: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>`,
};

/* ── TOAST ──────────────────────────────────────────────── */
let _toastTimer = null;

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ── RENDER REMINDERS ───────────────────────────────────── */
function renderReminders() {
  const el = document.getElementById('remindersList');
  if (!el) return;

  el.innerHTML = REMINDERS.map(r => `
    <div class="reminder-item" data-id="${r.id}">
      <div class="reminder-icon">${ICON[r.type]}</div>
      <div>
        <div class="reminder-title">${r.title}</div>
        <div class="reminder-text">${r.text}</div>
        <div class="reminder-time">${r.time}</div>
      </div>
    </div>
  `).join('');
}

/* ── RENDER RECORDS ─────────────────────────────────────── */
function renderRecords() {
  const el = document.getElementById('recordsList');
  if (!el) return;

  el.innerHTML = RECORDS.map(r => `
    <div class="record-item">
      <div class="record-icon">${ICON[r.icon]}</div>
      <div class="record-info">
        <div class="record-name">${r.name}</div>
        <div class="record-date">${r.date}</div>
      </div>
      <button
        class="record-dl"
        title="Download ${r.name}"
        onclick="showToast('Downloading ${r.name}…')"
      >${ICON.download}</button>
    </div>
  `).join('');
}

/* ── NAV HIGHLIGHT ──────────────────────────────────────── */
function setupNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

/* ── MARK ALL READ ──────────────────────────────────────── */
function setupMarkRead() {
  const btn = document.getElementById('markReadBtn');
  if (!btn) return;
  btn.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.reminder-item').forEach(el => el.classList.add('read'));
    showToast('All reminders marked as read.');
  });
}

/* ── INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderReminders();
  renderRecords();
  setupNav();
  setupMarkRead();
});