/* patient_dashboard.js */

const REMINDERS = [
  {
    title: 'Blood Pressure Logging Due',
    text: "You haven't logged your morning readings yet. Please take a moment to update your logs.",
    time: '2 hours ago',
    type: 'warning',
  },
  {
    title: 'Vaccination Update',
    text: 'Your annual flu shot is recommended this month. Check available slots.',
    time: 'Yesterday',
    type: 'info',
  },
];

const RECORDS = [
  { title: 'X-Ray Report',        date: 'Oct 12, 2023', type: 'doc'  },
  { title: 'Physiotherapy Note',  date: 'Sep 28, 2023', type: 'note' },
];

const SVG_WARNING = `<svg viewBox="0 0 24 24" fill="none" stroke="#e02424" stroke-width="2" width="22" height="22"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
const SVG_INFO    = `<svg viewBox="0 0 24 24" fill="none" stroke="#1a56db" stroke-width="2" width="22" height="22"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
const SVG_DOC     = `<svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
const SVG_NOTE    = `<svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
const SVG_DL      = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

function renderReminders() {
  const el = document.getElementById('remindersList');
  if (!el) return;
  el.innerHTML = REMINDERS.map(r => `
    <div class="reminder-item">
      <div class="reminder-item-icon">${r.type === 'warning' ? SVG_WARNING : SVG_INFO}</div>
      <div>
        <div class="reminder-item-title">${r.title}</div>
        <div class="reminder-item-text">${r.text}</div>
        <div class="reminder-item-time">${r.time}</div>
      </div>
    </div>`).join('');
}

function renderRecords() {
  const el = document.getElementById('recordsList');
  if (!el) return;
  el.innerHTML = RECORDS.map(r => `
    <div class="record-item">
      <div class="record-icon">${r.type === 'doc' ? SVG_DOC : SVG_NOTE}</div>
      <div class="record-info">
        <div class="record-title">${r.title}</div>
        <div class="record-date">${r.date}</div>
      </div>
      <button class="record-dl-btn" onclick="showToast('Downloading ${r.title}…')" title="Download">${SVG_DL}</button>
    </div>`).join('');
}

function markAllRead(e) {
  e.preventDefault();
  document.querySelectorAll('.reminder-item').forEach(el => el.style.opacity = '.4');
  showToast('All reminders marked as read.');
}

document.addEventListener('DOMContentLoaded', () => {
  renderReminders();
  renderRecords();
});