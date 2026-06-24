/* doctor_dashboard.js */

const QUEUE = [
  { id:1, time:'09:00 AM', initials:'RK', name:'Rajesh Kumar',    reason:'Post-Op Recovery Follow-up',      status:'completed',    bg:'#dbeafe', fg:'#1a56db' },
  { id:2, time:'09:30 AM', initials:'AS', name:'Ananya Sharma',   reason:'Chest pain, shortness of breath', status:'consultation', bg:'#1a56db', fg:'#fff',    active:true },
  { id:3, time:'09:45 AM', initials:'MD', name:"Michael D'Souza", reason:'Annual Cardiac Screening',         status:'scheduled',    bg:'#e5e7eb', fg:'#374151' },
  { id:4, time:'10:00 AM', initials:'PT', name:'Priya Thapa',     reason:'Hypertension Consultation',        status:'scheduled',    bg:'#e5e7eb', fg:'#374151' },
  { id:5, time:'10:15 AM', initials:'SM', name:'Sunil Manandhar', reason:'ECG Review',                       status:'scheduled',    bg:'#e5e7eb', fg:'#374151' },
];

const MESSAGES = [
  { initials:'JD', name:'John Doe (Patient ID: #882)', time:'12 min ago', text:"I've been feeling dizzy since taking the new medication this morning…", bg:'#e0e7ff', fg:'#3730a3' },
  { initials:'NS', name:'Nurse Sima',                  time:'45 min ago', text:'Lab results for Mr. Kumar (Room 302) are ready for your review.',       bg:'#ccfbf1', fg:'#0f766e' },
];

const MILESTONES = [
  { title:'Department Meeting',       time:'12:30 PM – 01:15 PM • Conference Hall B', color:'#1a56db' },
  { title:'Surgery: Valve Replacement', time:'02:30 PM – 05:00 PM • OT Suite 4',     color:'#0e9f6e' },
];

/* ── RENDER ─────────────────────────────────────────────── */
function renderQueue(data) {
  const tbody = document.getElementById('queueBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  data.forEach(r => {
    const tr = document.createElement('tr');
    if (r.active) tr.classList.add('dd-active-row');

    let badgeClass, badgeLabel;
    if (r.status === 'completed')    { badgeClass = 'dd-badge-completed';    badgeLabel = 'COMPLETED'; }
    else if (r.status === 'consultation') { badgeClass = 'dd-badge-consultation'; badgeLabel = 'IN CONSULTATION'; }
    else                              { badgeClass = 'dd-badge-scheduled';   badgeLabel = 'SCHEDULED'; }

    let actionHTML;
    if (r.status === 'completed')         actionHTML = `<a class="dd-action-link" href="#" onclick="showToast('Viewing report for ${r.name}');return false;">View Report</a>`;
    else if (r.status === 'consultation') actionHTML = `<button class="dd-active-btn" onclick="showToast('Active: ${r.name}')">Active</button>`;
    else                                  actionHTML = `<button class="dd-more-btn" onclick="showToast('Options for ${r.name}')">⋮</button>`;

    tr.innerHTML = `
      <td><span class="dd-time ${r.active ? 'active' : ''}">${r.time}</span></td>
      <td><div class="dd-patient-cell"><div class="dd-avatar" style="background:${r.bg};color:${r.fg}">${r.initials}</div><span>${r.name}</span></div></td>
      <td>${r.reason}</td>
      <td><span class="dd-badge ${badgeClass}">${badgeLabel}</span></td>
      <td>${actionHTML}</td>`;
    tbody.appendChild(tr);
  });
}

function renderMessages() {
  const el = document.getElementById('messagesList');
  if (!el) return;
  el.innerHTML = MESSAGES.map(m => `
    <div class="dd-msg-item" onclick="showToast('Opening message from ${m.initials}…')">
      <div class="dd-msg-avatar" style="background:${m.bg};color:${m.fg}">${m.initials}</div>
      <div class="dd-msg-content">
        <div class="dd-msg-top"><span class="dd-msg-name">${m.name}</span><span class="dd-msg-time">${m.time}</span></div>
        <div class="dd-msg-text">${m.text}</div>
      </div>
    </div>`).join('');
}

function renderMilestones() {
  const el = document.getElementById('milestonesList');
  if (!el) return;
  el.innerHTML = MILESTONES.map(m => `
    <div class="dd-milestone-item">
      <div class="dd-milestone-bar" style="background:${m.color}"></div>
      <div>
        <div class="dd-milestone-title">${m.title}</div>
        <div class="dd-milestone-time">${m.time}</div>
      </div>
    </div>`).join('');
}

/* ── SEARCH FILTER ──────────────────────────────────────── */
function setupSearch() {
  const input = document.getElementById('ddSearchInput');
  if (!input) return;
  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      renderQueue(q ? QUEUE.filter(r => r.name.toLowerCase().includes(q) || r.reason.toLowerCase().includes(q)) : QUEUE);
    }, 250);
  });
}

/* ── DATE ────────────────────────────────────────────────── */
function setDate() {
  const el = document.getElementById('ddDate');
  if (el) el.textContent = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

/* ── INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setDate();
  renderQueue(QUEUE);
  renderMessages();
  renderMilestones();
  setupSearch();
});