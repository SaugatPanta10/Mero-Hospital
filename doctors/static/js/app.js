/* ============================================================
   MERO HOSPITAL — app.js
   ============================================================ */

/* ── DATA ──────────────────────────────────────────────────── */
const QUEUE_DATA = [
  {
    id: 1,
    time: "09:00 AM",
    initials: "RK",
    name: "Rajesh Kumar",
    reason: "Post-Op Recovery Follow-up",
    status: "completed",
    avatarBg: "#dbeafe",
    avatarColor: "#1a56db",
  },
  {
    id: 2,
    time: "09:30 AM",
    initials: "AS",
    name: "Ananya Sharma",
    reason: "Chest pain, shortness of breath",
    status: "consultation",
    avatarBg: "#1a56db",
    avatarColor: "#fff",
    isActive: true,
  },
  {
    id: 3,
    time: "09:45 AM",
    initials: "MD",
    name: "Michael D'Souza",
    reason: "Annual Cardiac Screening",
    status: "scheduled",
    avatarBg: "#e5e7eb",
    avatarColor: "#374151",
  },
  {
    id: 4,
    time: "10:00 AM",
    initials: "PT",
    name: "Priya Thapa",
    reason: "Hypertension Consultation",
    status: "scheduled",
    avatarBg: "#e5e7eb",
    avatarColor: "#374151",
  },
  {
    id: 5,
    time: "10:15 AM",
    initials: "SM",
    name: "Sunil Manandhar",
    reason: "ECG Review",
    status: "scheduled",
    avatarBg: "#e5e7eb",
    avatarColor: "#374151",
  },
];

const MESSAGES_DATA = [
  {
    initials: "JD",
    name: "John Doe (Patient ID: #882)",
    time: "12 min ago",
    text: "I've been feeling dizzy since taking the new medication this morning...",
    avatarBg: "#e0e7ff",
    avatarColor: "#3730a3",
  },
  {
    initials: "NS",
    name: "Nurse Sima",
    time: "45 min ago",
    text: "Lab results for Mr. Kumar (Room 302) are ready for your review.",
    avatarBg: "#ccfbf1",
    avatarColor: "#0f766e",
  },
];

const MILESTONES_DATA = [
  {
    title: "Department Meeting",
    time: "12:30 PM – 01:15 PM • Conference Hall B",
    color: "#1a56db",
  },
  {
    title: "Surgery: Valve Replacement",
    time: "02:30 PM – 05:00 PM • OT Suite 4",
    color: "#0e9f6e",
  },
];

/* ── RENDER QUEUE TABLE ────────────────────────────────────── */
function renderQueue(data) {
  const tbody = document.getElementById("queueTableBody");
  tbody.innerHTML = "";

  data.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.isActive) tr.classList.add("active-row");

    // STATUS badge
    let statusClass, statusLabel;
    switch (row.status) {
      case "completed":
        statusClass = "status-completed";
        statusLabel = "COMPLETED";
        break;
      case "consultation":
        statusClass = "status-consultation";
        statusLabel = "IN CONSULTATION";
        break;
      default:
        statusClass = "status-scheduled";
        statusLabel = "SCHEDULED";
    }

    // ACTIONS column
    let actionsHTML;
    if (row.status === "completed") {
      actionsHTML = `<a class="action-link" href="#" onclick="showToast('Viewing report for ${row.name}'); return false;">View Report</a>`;
    } else if (row.status === "consultation") {
      actionsHTML = `<button class="active-btn" onclick="showToast('Session active for ${row.name}')">Active</button>`;
    } else {
      actionsHTML = `<button class="more-btn" onclick="openRowMenu(${row.id}, this)" title="More options">⋮</button>`;
    }

    tr.innerHTML = `
      <td><span class="cell-time ${row.isActive ? "active" : ""}">${row.time}</span></td>
      <td>
        <div class="patient-cell">
          <div class="avatar" style="background:${row.avatarBg};color:${row.avatarColor}">${row.initials}</div>
          <span class="patient-name">${row.name}</span>
        </div>
      </td>
      <td>${row.reason}</td>
      <td><span class="status-badge ${statusClass}">${statusLabel}</span></td>
      <td>${actionsHTML}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ── RENDER MESSAGES ───────────────────────────────────────── */
function renderMessages(data) {
  const list = document.getElementById("messagesList");
  list.innerHTML = "";

  data.forEach((msg) => {
    const div = document.createElement("div");
    div.className = "message-item";
    div.innerHTML = `
      <div class="msg-avatar" style="background:${msg.avatarBg};color:${msg.avatarColor}">${msg.initials}</div>
      <div class="msg-content">
        <div class="msg-top">
          <span class="msg-name">${msg.name}</span>
          <span class="msg-time">${msg.time}</span>
        </div>
        <p class="msg-text">${msg.text}</p>
      </div>
    `;
    div.addEventListener("click", () =>
      showToast(`Opening message from ${msg.initials}…`),
    );
    list.appendChild(div);
  });
}

/* ── RENDER MILESTONES ─────────────────────────────────────── */
function renderMilestones(data) {
  const list = document.getElementById("milestonesList");
  list.innerHTML = "";

  data.forEach((m) => {
    const div = document.createElement("div");
    div.className = "milestone-item";
    div.innerHTML = `
      <div class="milestone-bar" style="background:${m.color}"></div>
      <div class="milestone-info">
        <div class="milestone-title">${m.title}</div>
        <div class="milestone-time">${m.time}</div>
      </div>
    `;
    list.appendChild(div);
  });
}

/* ── DATE ──────────────────────────────────────────────────── */
function setDate() {
  const el = document.getElementById("currentDate");
  const now = new Date();
  el.textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ── TOAST ─────────────────────────────────────────────────── */
let toastTimer = null;
function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

/* ── ROW MORE MENU ─────────────────────────────────────────── */
function openRowMenu(id, btn) {
  const row = QUEUE_DATA.find((r) => r.id === id);
  if (!row) return;
  showToast(`Options: ${row.name} — Mark Complete / Reschedule / Cancel`);
}

/* ── NAV HIGHLIGHT ─────────────────────────────────────────── */
function setupNav() {
  const items = document.querySelectorAll(".nav-item");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      items.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      const page = item.dataset.page;
      if (page !== "dashboard")
        showToast(`Navigating to ${item.textContent.trim()}…`);
    });
  });
}

/* ── NOTIFICATIONS PANEL ───────────────────────────────────── */
function setupNotifications() {
  const btn = document.getElementById("notifBtn");
  const panel = document.getElementById("notifPanel");
  const close = document.getElementById("notifClose");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    panel.classList.toggle("open");
  });
  close.addEventListener("click", () => panel.classList.remove("open"));
  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && e.target !== btn) {
      panel.classList.remove("open");
    }
  });
}

/* ── SEARCH ────────────────────────────────────────────────── */
function setupSearch() {
  const input = document.getElementById("searchInput");
  let debounce;
  input.addEventListener("input", () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        renderQueue(QUEUE_DATA);
        return;
      }
      const filtered = QUEUE_DATA.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.reason.toLowerCase().includes(q),
      );
      renderQueue(filtered);
    }, 250);
  });
}

/* ── BUTTON ACTIONS ────────────────────────────────────────── */
function setupButtons() {
  document.getElementById("nextConsultBtn")?.addEventListener("click", () => {
    const next = QUEUE_DATA.find((r) => r.status === "scheduled");
    showToast(
      next
        ? `Starting consultation for ${next.name}…`
        : "No scheduled patients remaining.",
    );
  });

  document
    .getElementById("emergencyLeaveBtn")
    ?.addEventListener("click", () => {
      showToast("Emergency leave flagged. Notifying staff…");
    });

  document.getElementById("exportPdfBtn")?.addEventListener("click", () => {
    showToast("Generating PDF export…");
  });

  document.getElementById("viewAllBtn")?.addEventListener("click", () => {
    showToast("Loading full queue…");
  });

  document.getElementById("viewScheduleBtn")?.addEventListener("click", () => {
    showToast("Opening full schedule…");
  });

  document
    .getElementById("startConsultationBtn")
    ?.addEventListener("click", () => {
      const next = QUEUE_DATA.find((r) => r.status === "scheduled");
      showToast(
        next
          ? `Starting consultation for ${next.name}…`
          : "No scheduled patients.",
      );
    });
}

/* ── LIVE PATIENT COUNTER TICK ─────────────────────────────── */
function setupLiveCounter() {
  let count = 14;
  const el = document.getElementById("patientsCount");
  setInterval(() => {
    // subtle drift to simulate real data
    count += Math.random() > 0.5 ? 1 : 0;
    el.textContent = count;
  }, 30000);
}

/* ── INIT ──────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  setDate();
  renderQueue(QUEUE_DATA);
  renderMessages(MESSAGES_DATA);
  renderMilestones(MILESTONES_DATA);
  setupNav();
  setupNotifications();
  setupSearch();
  setupButtons();
  setupLiveCounter();
});
