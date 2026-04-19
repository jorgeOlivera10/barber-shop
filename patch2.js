const fs = require('fs');
const file = 'c:\\Users\\Jorge\\Desktop\\citafacil-demo\\panel.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Add relative dates to clients
content = content.replace(
  /const cDone = cAppts\.filter\(a => a\.status === 'done'\);/,
  `const cDone = cAppts.filter(a => a.status === 'done').sort((a,b) => b.date.localeCompare(a.date));
          let daysAgo = '—';
          if (cDone.length > 0) {
            const diffMs = new Date() - new Date(cDone[0].date);
            const diffDays = Math.floor(diffMs / 86400000);
            if (diffDays === 0) daysAgo = 'Hoy';
            else if (diffDays === 1) daysAgo = 'Ayer';
            else if (diffDays < 7) daysAgo = \`Hace \${diffDays}d\`;
            else if (diffDays < 30) daysAgo = \`Hace \${Math.floor(diffDays/7)} sem\`;
            else daysAgo = \`Hace \${Math.floor(diffDays/30)} mes\`;
          }`
);

content = content.replace(
  /<div class="cs-item"><div class="cs-val">\\\$\{cAppts\.length\}<\/div><div class="cs-label">Citas<\/div><\/div>/,
  `<div class="cs-item"><div class="cs-val">\${daysAgo}</div><div class="cs-label">Últ. vez</div></div>
          <div class="cs-item"><div class="cs-val">\${cAppts.length}</div><div class="cs-label">Total Citas</div></div>`
);

content = content.replace(
  /<div class="cs-item"><div class="cs-val">\\\$\{cDone\.length\}<\/div><div class="cs-label">Complet\.<\/div><\/div>/,
  ``
);

// 2. Add time left logic and Income widget in Informes
content = content.replace(
  /function renderDashboard\(\)\s*\{[\s\S]*?function bindTLActions/,
  `// Funciones para la agenda semanal
      let dashSelectedDate = todayISO;
      
      window.setDashDate = (date) => {
        dashSelectedDate = date;
        renderDashboard();
      };
      
      function renderDashboard() {
        const selectedDateText = dashSelectedDate;
        const ta = DB.appointments.filter(a => a.date === selectedDateText);
        const totalToday = ta.length;
        const doneToday = ta.filter(a => a.status === 'done').length;
        const pendingToday = ta.filter(a => a.status === 'pending' || a.status === 'active').length;
        const activeAppt = ta.find(a => a.status === 'active') || ta.filter(a => a.status === 'pending').sort((a, b) => a.time.localeCompare(b.time))[0];

        let perf = totalToday > 0 ? Math.round((doneToday / totalToday) * 100) : 0;
        
        let timeLabel = activeAppt ? activeAppt.time : 'Libre';
        if (activeAppt && dashSelectedDate === todayISO) {
          const [h, m] = activeAppt.time.split(':').map(Number);
          const t = new Date(); t.setHours(h, m, 0);
          const diff = Math.floor((t - new Date()) / 60000);
          if (diff <= 0) timeLabel = '⏱️ AHORA';
          else if (diff < 60) timeLabel = \`⏱️ En \${diff} min\`;
          else timeLabel = \`⏱️ En \${Math.floor(diff/60)}h \${diff%60}m\`;
        }

        // KPIs (Sin precios ni facturacion)
        $('#kpi-grid').innerHTML = \`
      <div class="kpi-card">
        <div class="kpi-label">Seleccionado: \${dashSelectedDate === todayISO ? 'HOY' : dashSelectedDate}</div>
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
        <div class="kpi-value" style="font-size:1.6rem">\${timeLabel}</div>
        <div class="kpi-sub" style="color:var(--gold-deep); font-weight: 500">\${activeAppt ? (getClient(activeAppt.clientId)?.name || 'Cliente sin nombre') : 'No hay más citas en la fecha'}</div>
      </div>
    \`;

        $('#badge-agenda').textContent = DB.appointments.filter(a => a.date === todayISO && (a.status === 'pending' || a.status === 'active')).length;

        // Generar barra de la semana visual
        let weekHtml = '<div style="display:flex; gap:0.5rem; overflow-x:auto; margin-bottom:1.5rem; padding-bottom: 0.5rem;">';
        for(let i=0; i<7; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            const iso = \`\${d.getFullYear()}-\${pad(d.getMonth() + 1)}-\${pad(d.getDate())}\`;
            const name = i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : DAYS_ES[d.getDay()].substring(0,3);
            const count = DB.appointments.filter(a => a.date === iso && a.status !== 'cancelled').length;
            const isSel = dashSelectedDate === iso;
            weekHtml += \`<div onclick="setDashDate('\${iso}')" style="cursor:pointer; min-width:80px; flex:1; text-align:center; padding:0.75rem; border-radius:6px; border: 1px solid \${isSel ? 'var(--gold)' : 'var(--border)'}; background: \${isSel ? 'var(--gold-05)' : 'var(--surface)'};">
                <div style="font-size:0.75rem; color:\${isSel ? 'var(--gold)' : 'var(--muted)'}; font-weight:700; text-transform:uppercase">\${name} <span style="opacity:0.7">\${d.getDate()}</span></div>
                <div style="font-size:1.1rem; font-weight:700; margin-top:0.25rem">\${count} <span style="font-size:0.6rem;font-weight:500;">citas</span></div>
            </div>\`;
        }
        weekHtml += '</div>';

        // Timeline
        const tl = $('#dash-timeline');
        const sorted = [...ta].sort((a, b) => a.time.localeCompare(b.time));
        
        const finalHtml = weekHtml + (!sorted.length ? '<div class="empty" style="padding:3rem 1rem;background:var(--surface)"><div class="empty-icon">◎</div>Agenda libre para esta fecha</div>' : 
        sorted.map(a => {
            const cl = getClient(a.clientId);
            const svc = getService(a.serviceId);
            const isDone = a.status === 'done' || a.status === 'cancelled' || a.status === 'noshow';
            const isNow = a.status === 'active';
            
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
              \${!isNow && !isDone && dashSelectedDate === todayISO ? \`<button class="td-btn" style="border-color:var(--amber);color:var(--amber); font-size:.8rem; font-weight:700" title="Activar ahora" data-quick-active="\${a.id}">▶</button>\` : ''}
              <button class="td-btn" title="Editar cita" data-edit-appt="\${a.id}">✎</button>
            </div>
          </div>
        </div>\`;
          }).join(''));
          
        tl.innerHTML = finalHtml;

        function bindTLActions`
);

// 3. Informes: Ingresos 
content = content.replace(
  /function renderReports\(\)\s*\{/,
  `function renderReports() {
        const todayIncome = income(todayAppts().filter(a => a.status === 'done'));
        const weekIncome = income(weekAppts().filter(a => a.status === 'done'));
        const monthIncomeVal = income(monthAppts().filter(a => a.status === 'done'));
`
);

content = content.replace(
  /<div class="rep-card"><div class="rep-label">Ingresos este mes<\/div><div class="rep-val">\\\$\{fmtPrice\(income\(mDone\)\)\}<\/div><div class="rep-ctx">\\\$\{mDone\.length\} citas completadas<\/div><\/div>/,
  `<div class="rep-card"><div class="rep-label">Ingresos Hoy</div><div class="rep-val">\${fmtPrice(todayIncome)}</div><div class="rep-ctx">En la jornada actual</div></div>
   <div class="rep-card"><div class="rep-label">Ingresos Semana</div><div class="rep-val">\${fmtPrice(weekIncome)}</div><div class="rep-ctx">Últimos 7 días</div></div>
   <div class="rep-card"><div class="rep-label">Ingresos Mes</div><div class="rep-val">\${fmtPrice(monthIncomeVal)}</div><div class="rep-ctx">\${mDone.length} citas / \${monthIncomeVal > 0 ? fmtPrice(monthIncomeVal/30) : 0} media dia</div></div>`
);


// 4. Also adjust the rep-grid to fit 4 elements (including No-shows and Totals)
content = content.replace(
  /\.rep-grid \{[\s\S]*?grid-template-columns: repeat\(3, 1fr\);/,
  `.rep-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully patched patch2.js!');
