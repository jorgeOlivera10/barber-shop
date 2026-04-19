const fs = require('fs');
const file = 'c:\\Users\\Jorge\\Desktop\\citafacil-demo\\panel.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Swap the Google Font
content = content.replace(
  /<link[^>]+family=Inter[^>]+>/,
  '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">'
);

// 2. Add Isolvia colors to :root
content = content.replace(
  /:root\s*\{[^}]+\--shadow-gold[^}]+\}/,
  `:root {
      /* ── Paleta Clara Isolvia ── */
      --bg: #F7F5F0;
      --surface: #FFFFFF;
      --surface2: #F0F2EB;
      --surface3: rgba(42, 43, 40, 0.05);
      --text: #2A2B28;
      --text-soft: #555550;
      --muted: #8A8881;
      --muted-dim: #6D735C;
      --gold: #C2785B;
      --gold-soft: #A55D42;
      --gold-deep: #A55D42;
      --gold-05: rgba(194, 120, 91, .05);
      --gold-10: rgba(194, 120, 91, .10);
      --gold-20: rgba(194, 120, 91, .20);
      --gold-30: rgba(194, 120, 91, .30);
      --white: #FFFFFF;
      --border: rgba(42, 43, 40, .10);
      --border-2: rgba(42, 43, 40, .20);
      /* Estados */
      --green: #6D735C;
      --green-bg: rgba(109, 115, 92, .12);
      --amber: #B38640;
      --amber-bg: rgba(179, 134, 64, .12);
      --red: #A6655B;
      --red-bg: rgba(166, 101, 91, .12);
      --blue: #5B7AA6;
      --blue-bg: rgba(91, 122, 166, .12);
      --purple: #816A91;
      --purple-bg: rgba(129, 106, 145, .12);
      /* Layout */
      --sidebar-w: 240px;
      --topbar-h: 70px;
      --ease: cubic-bezier(.4, 0, .2, 1);
      --ease-out: cubic-bezier(.16, 1, .3, 1);
      --shadow-gold: 0 6px 16px rgba(194, 120, 91, .25);
    }`
);

// 3. Change font family
content = content.replace(/Cormorant Garamond/g, 'Playfair Display');

// 4. Update .dash-grid to remove sidebar, add styles for timeline visuals
const extraCSS = `
    .dash-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
      max-width: 900px;
    }
    
    .dash-grid > div:nth-child(2) {
      display: none !important;
    }

    .btn-new {
      display: flex;
      align-items: center;
      gap: .6rem;
      padding: .85rem 2.5rem;
      background: var(--gold);
      color: var(--white);
      font-size: .85rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      border-radius: 6px;
      transition: all .2s var(--ease);
      box-shadow: var(--shadow-gold);
    }
    .btn-new:hover {
      background: var(--gold-soft);
      transform: translateY(-2px);
    }

    .tl-item {
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 5px solid var(--border-2);
      padding: 1.25rem 1.5rem;
      display: grid;
      grid-template-columns: 80px 1fr auto;
      gap: 1.5rem;
      align-items: center;
      transition: all .2s;
      border-radius: 6px;
      margin-bottom: 0.75rem;
    }
    .tl-item.tl-now {
      border-left-color: var(--amber);
      background: var(--amber-bg);
    }
    .tl-item.tl-pending {
      border-left-color: var(--blue);
    }
    .tl-item.tl-done {
      opacity: .65;
      border-left-color: var(--green);
    }
    .tl-item.tl-done .tl-name {
      text-decoration: line-through;
      color: var(--muted);
    }

    .tl-time {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text);
      text-align: center;
      letter-spacing: -0.02em;
    }
    .tl-item.tl-now .tl-time {
      color: var(--amber);
    }

    .tl-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.35rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: .2rem;
    }

    .tl-service {
      font-size: .9rem;
      color: var(--text-soft);
      font-weight: 500;
    }
    
    .kpi-card {
      border-radius: 6px;
    }
`;

content = content.replace(/\.dash-grid\s*\{[^}]+\}/, '');
content = content.replace(/\.btn-new\s*\{[^}]+\}/, '');
content = content.replace(/\.tl-item\s*\{[^}]+\}/, '');
content = content.replace(/\.tl-item\.tl-now\s*\{[^}]+\}/, '');
content = content.replace(/\.tl-item\.tl-done\s*\{[^}]+\}/, '');
content = content.replace(/\.tl-time\s*\{[^}]+\}/, '');
content = content.replace(/\.tl-name\s*\{[^}]+\}/, '');
content = content.replace(/\.tl-service\s*\{[^}]+\}/, '');

content = content.replace('</style>', extraCSS + '\n  </style>');

// 5. Adjust the topbar "Nueva Cita" text
content = content.replace('>+ Nueva cita<', '>＋ NUEVA CITA<');


// 6. Rewrite renderDashboard JS
content = content.replace(
  /function renderDashboard\(\)\s*\{[\s\S]*?function bindTLActions\(\)\s*\{/,
  `function renderDashboard() {
        const ta = todayAppts();
        const wa = weekAppts();
        const totalToday = ta.length;
        const doneToday = ta.filter(a => a.status === 'done').length;
        const pendingToday = ta.filter(a => a.status === 'pending' || a.status === 'active').length;
        const activeAppt = ta.find(a => a.status === 'active') || ta.filter(a => a.status === 'pending').sort((a, b) => a.time.localeCompare(b.time))[0];

        let perf = totalToday > 0 ? Math.round((doneToday / totalToday) * 100) : 0;

        // KPIs (Sin precios ni facturacion, centrado en citas y usuarios)
        $('#kpi-grid').innerHTML = \`
      <div class="kpi-card">
        <div class="kpi-label">Día de hoy</div>
        <div class="kpi-value">\${totalToday} citas</div>
        <div class="kpi-sub">\${pendingToday} pendientes · \${doneToday} listas</div>
        <div class="kpi-accent">◐</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Progreso de la jornada</div>
        <div class="kpi-value">\${perf}%</div>
        <div class="kpi-sub">Completado</div>
        <div class="kpi-accent">📈</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Nuevos Clientes (Histórico)</div>
        <div class="kpi-value">\${ DB.clients.filter(c => c.tag === 'new').length }</div>
        <div class="kpi-sub">Registrados como "Nuevo"</div>
        <div class="kpi-accent">👤</div>
      </div>
      <div class="kpi-card" style="background:var(--gold-05); border-color:var(--gold-20)">
        <div class="kpi-label" style="color:var(--gold-deep)">Próximo Cliente</div>
        <div class="kpi-value" style="font-size:1.6rem">\${activeAppt ? activeAppt.time : 'Libre'}</div>
        <div class="kpi-sub" style="color:var(--gold-deep); font-weight: 500">\${activeAppt ? (getClient(activeAppt.clientId)?.name || 'Cliente sin nombre') : 'No hay más citas para hoy'}</div>
      </div>
    \`;

        $('#badge-agenda').textContent = pendingToday;
        $('#dash-day-summary').textContent = \`\${DAYS_ES[today.getDay()].charAt(0).toUpperCase() + DAYS_ES[today.getDay()].slice(1)}, \${today.getDate()} \${MONTHS_ES[today.getMonth()]}\`;

        // Timeline
        const tl = $('#dash-timeline');
        const sorted = [...ta].sort((a, b) => a.time.localeCompare(b.time));
        if (!sorted.length) {
          tl.innerHTML = '<div class="empty" style="padding:3rem 1rem;background:var(--surface)"><div class="empty-icon">◎</div>Agenda vacía para hoy</div>';
        } else {
          tl.innerHTML = sorted.map(a => {
            const cl = getClient(a.clientId);
            const svc = getService(a.serviceId);
            const isDone = a.status === 'done' || a.status === 'cancelled' || a.status === 'noshow';
            const isNow = a.status === 'active';
            const isPending = a.status === 'pending';
            
            let stClass = isNow ? 'tl-now' : isDone ? 'tl-done' : 'tl-pending';

            return \`<div class="tl-item \${stClass}">
          <div class="tl-time">\${a.time}</div>
          <div>
            <div class="tl-name">\${cl ? cl.name : 'Cliente Anónimo'}</div>
            <div class="tl-service">\${svc ? svc.name : 'Servicio general'} \${svc ? '· ' + svc.duration + ' min' : ''}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.6rem">
            <span class="\${pillClass(a.status)}" style="font-size:0.65rem; padding:0.25rem 0.75rem">\${statusLabel(a.status)}</span>
            <div class="tl-actions">
              \${!isDone ? \`<button class="td-btn" style="border-color:var(--green);color:var(--green); font-size:1rem; padding: .2rem .7rem;" title="Marcar completada" data-quick-done="\${a.id}">✓</button>\` : ''}
              \${!isNow && !isDone ? \`<button class="td-btn" style="border-color:var(--amber);color:var(--amber); font-size:.8rem; font-weight:700" title="Activar ahora" data-quick-active="\${a.id}">▶</button>\` : ''}
              <button class="td-btn" title="Editar cita" data-edit-appt="\${a.id}">✎</button>
            </div>
          </div>
        </div>\`;
          }).join('');
        }

        bindTLActions();
      }

      function bindTLActions() {`
);

// Add quick active binding
content = content.replace(
  /function bindTLActions\(\)\s*\{/,
  `function bindTLActions() {
        $$('[data-quick-active]').forEach(btn =>
          on(btn, 'click', () => {
            const a = DB.appointments.find(x => x.id === btn.dataset.quickActive);
            if (a) { a.status = 'active'; persist(); renderView(currentView); toast('Cita en curso marcada', '▶'); }
          })
        );\n`
)


fs.writeFileSync(file, content, 'utf8');
console.log('Successfully patched panel.html!');
