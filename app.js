/* ═══════════════════════════════════════════════════
   Financial CRM Dashboard – app.js
   All chart rendering, data population & interactions
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────── Theme Toggle ──────── */
  const toggle = document.getElementById('themeToggle');
  const stored  = localStorage.getItem('theme');
  if (stored === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    drawExchangeChart();
    drawCostsChart();
    drawEfficiencyChart();
  });

  /* ──────── Nav item clicks ──────── */
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });

  /* ──────── Pill group (exchange rates) ──────── */
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      drawExchangeChart();
    });
  });

  /* ──────── Helpers ──────── */
  function getColor(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  /* ──────── Exchange Rates Chart (line) ──────── */
  const exCtx = document.getElementById('exchangeChart').getContext('2d');

  const datasets = {
    usd: [1.08, 1.12, 1.09, 1.15, 1.18, 1.14, 1.20, 1.22, 1.19, 1.25, 1.28, 1.30],
    eur: [0.92, 0.94, 0.91, 0.96, 0.98, 0.95, 0.99, 1.01, 0.97, 1.03, 1.05, 1.02],
    gbp: [0.78, 0.80, 0.79, 0.82, 0.84, 0.81, 0.85, 0.86, 0.83, 0.88, 0.90, 0.87],
  };
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function drawExchangeChart() {
    const canvas = document.getElementById('exchangeChart');
    const ctx = exCtx;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const activePill = document.querySelector('.pill.active');
    const key = activePill ? activePill.dataset.period : 'usd';
    const data = datasets[key];

    const w = rect.width;
    const h = rect.height;
    const padL = 40, padR = 20, padT = 10, padB = 30;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    const min = Math.min(...data) - 0.05;
    const max = Math.max(...data) + 0.05;

    const xStep = chartW / (data.length - 1);

    function toX(i) { return padL + i * xStep; }
    function toY(v) { return padT + chartH - ((v - min) / (max - min)) * chartH; }

    // Grid lines
    ctx.strokeStyle = isDark() ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padT + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
    }

    // Labels
    ctx.font = '11px Inter';
    ctx.fillStyle = isDark() ? 'rgba(255,255,255,.4)' : 'rgba(0,0,0,.35)';
    ctx.textAlign = 'center';
    data.forEach((_, i) => {
      if (i % 2 === 0) ctx.fillText(months[i], toX(i), h - 6);
    });

    // Gradient fill
    const grad = ctx.createLinearGradient(0, padT, 0, h - padB);
    grad.addColorStop(0, 'rgba(124,92,252,.22)');
    grad.addColorStop(1, 'rgba(124,92,252,.01)');

    ctx.beginPath();
    ctx.moveTo(toX(0), toY(data[0]));
    for (let i = 1; i < data.length; i++) {
      const cpx = (toX(i - 1) + toX(i)) / 2;
      ctx.bezierCurveTo(cpx, toY(data[i-1]), cpx, toY(data[i]), toX(i), toY(data[i]));
    }
    ctx.lineTo(toX(data.length - 1), h - padB);
    ctx.lineTo(toX(0), h - padB);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(data[0]));
    for (let i = 1; i < data.length; i++) {
      const cpx = (toX(i - 1) + toX(i)) / 2;
      ctx.bezierCurveTo(cpx, toY(data[i-1]), cpx, toY(data[i]), toX(i), toY(data[i]));
    }
    ctx.strokeStyle = '#7c5cfc';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Dots
    data.forEach((v, i) => {
      ctx.beginPath();
      ctx.arc(toX(i), toY(v), 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#7c5cfc';
      ctx.fill();
      ctx.strokeStyle = isDark() ? '#1a1429' : '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  /* ──────── Costs Bar Chart ──────── */
  const costsCtx = document.getElementById('costsChart').getContext('2d');
  const costData = [
    { label: 'Mon', value: 420 },
    { label: 'Tue', value: 680 },
    { label: 'Wed', value: 350 },
    { label: 'Thu', value: 790 },
    { label: 'Fri', value: 560 },
    { label: 'Sat', value: 310 },
    { label: 'Sun', value: 480 },
  ];

  function drawCostsChart() {
    const canvas = document.getElementById('costsChart');
    const ctx = costsCtx;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const w = rect.width;
    const h = rect.height;
    const padL = 40, padR = 10, padT = 10, padB = 28;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;
    const maxVal = Math.max(...costData.map(d => d.value));

    const barW = Math.min(30, (chartW / costData.length) * 0.55);
    const gap = chartW / costData.length;

    // Grid
    ctx.strokeStyle = isDark() ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padT + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
    }

    // Bars
    costData.forEach((d, i) => {
      const x = padL + gap * i + (gap - barW) / 2;
      const barH = (d.value / maxVal) * chartH;
      const y = padT + chartH - barH;

      const grad = ctx.createLinearGradient(x, y, x, padT + chartH);
      grad.addColorStop(0, '#7c5cfc');
      grad.addColorStop(1, '#b794f6');

      // Rounded bar
      const r = Math.min(6, barW / 2);
      ctx.beginPath();
      ctx.moveTo(x, padT + chartH);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.lineTo(x + barW - r, y);
      ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
      ctx.lineTo(x + barW, padT + chartH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Label
      ctx.font = '11px Inter';
      ctx.fillStyle = isDark() ? 'rgba(255,255,255,.4)' : 'rgba(0,0,0,.35)';
      ctx.textAlign = 'center';
      ctx.fillText(d.label, x + barW / 2, h - 6);
    });
  }

  /* ──────── Efficiency Donut ──────── */
  const effCtx = document.getElementById('efficiencyChart').getContext('2d');
  const effData = [
    { label: 'Completed', value: 78, color: '#7c5cfc' },
    { label: 'Pending',   value: 14, color: '#f59e0b' },
    { label: 'Overdue',   value: 8,  color: '#f43f5e' },
  ];

  function drawEfficiencyChart() {
    const canvas = document.getElementById('efficiencyChart');
    const ctx = effCtx;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 170 * dpr;
    canvas.height = 170 * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, 170, 170);

    const cx = 85, cy = 85, r = 65, thick = 18;
    const total = effData.reduce((s, d) => s + d.value, 0);
    let startAngle = -Math.PI / 2;

    effData.forEach(d => {
      const sweep = (d.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, startAngle + sweep);
      ctx.strokeStyle = d.color;
      ctx.lineWidth = thick;
      ctx.lineCap = 'round';
      ctx.stroke();
      startAngle += sweep + 0.04; // gap
    });

    // Build legend
    const legend = document.getElementById('donutLegend');
    legend.innerHTML = effData.map(d =>
      `<div class="legend-item"><span class="legend-dot" style="background:${d.color}"></span>${d.label}</div>`
    ).join('');
  }

  /* ──────── Recent Activities ──────── */
  const activities = [
    { initials: 'PK', name: 'To Philip Kelley', sub: 'Sent', amount: '+$450', positive: true, bg: '#7c5cfc' },
    { initials: 'PK', name: 'To Philip Kelley', sub: 'Received', amount: '+$1,200', positive: true, bg: '#22c55e' },
    { initials: 'SB', name: 'Starbucks', sub: 'Cafe and Restaurants', amount: '-$8.00', positive: false, bg: '#f59e0b' },
    { initials: 'AM', name: 'Amazon', sub: 'Shopping', amount: '-$124.50', positive: false, bg: '#f43f5e' },
    { initials: 'NF', name: 'Netflix', sub: 'Entertainment', amount: '-$15.99', positive: false, bg: '#e9a0ff' },
  ];

  const actList = document.getElementById('activityList');
  actList.innerHTML = activities.map(a => `
    <li class="activity-item">
      <div class="activity-avatar" style="background:${a.bg}">${a.initials}</div>
      <div class="activity-info">
        <div class="activity-title">${a.name}</div>
        <div class="activity-sub">${a.sub}</div>
      </div>
      <span class="activity-amount ${a.positive ? 'positive' : 'negative'}">${a.amount}</span>
    </li>
  `).join('');

  /* ──────── Right Panel – Tasks ──────── */
  const tasks = [
    { name: 'Root Talk', time: '1:00 PM – 4:00 PM · Every day', color: '#f43f5e' },
    { name: 'Relationship Expectations', time: '4:00 PM – 6:30 PM · Jasmine Recon', color: '#f59e0b' },
    { name: 'Q3 Financial Review', time: '10:00 AM – 11:30 AM · Tomorrow', color: '#22c55e' },
  ];

  const taskList = document.getElementById('taskList');
  taskList.innerHTML = tasks.map(t => `
    <div class="task-item">
      <span class="task-dot" style="background:${t.color}"></span>
      <div class="task-info">
        <div class="task-name">${t.name}</div>
        <div class="task-time">${t.time}</div>
      </div>
    </div>
  `).join('');

  /* ──────── Right Panel – Meetings ──────── */
  const meetings = [
    { name: 'Weekly Design Meeting', time: '10:00 AM – 11:00 AM', bg: '#7c5cfc', icon: '📐' },
    { name: 'Team Building MeetUp', time: '1:00 PM – 3:30 PM', bg: '#22c55e', icon: '🤝' },
    { name: 'Client Presentation', time: '4:00 PM – 5:00 PM', bg: '#f59e0b', icon: '📊' },
  ];

  const meetList = document.getElementById('meetingList');
  meetList.innerHTML = meetings.map(m => `
    <div class="meeting-item">
      <div class="meeting-icon" style="background:${m.bg}">${m.icon}</div>
      <div class="meeting-info">
        <div class="meeting-name">${m.name}</div>
        <div class="meeting-time">${m.time}</div>
      </div>
    </div>
  `).join('');

  /* ──────── Right Panel – Shoutouts ──────── */
  const shoutouts = [
    { name: 'Adams Wilson', desc: 'Nailed the quarterly report!', bg: '#7c5cfc' },
    { name: 'Johnny Fox', desc: 'Great client call today', bg: '#f59e0b' },
    { name: 'Alice Turner', desc: 'Perfect sprint retrospective', bg: '#22c55e' },
  ];

  const shoutList = document.getElementById('shoutoutList');
  shoutList.innerHTML = shoutouts.map(s => `
    <div class="shoutout-item">
      <div class="shoutout-avatar" style="background:${s.bg}">${s.name.split(' ').map(w => w[0]).join('')}</div>
      <div class="shoutout-info">
        <div class="shoutout-name">${s.name}</div>
        <div class="shoutout-desc">${s.desc}</div>
      </div>
    </div>
  `).join('');

  /* ──────── Initial Draw ──────── */
  drawExchangeChart();
  drawCostsChart();
  drawEfficiencyChart();

  /* Redraw on resize */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      drawExchangeChart();
      drawCostsChart();
      drawEfficiencyChart();
    }, 150);
  });

});
