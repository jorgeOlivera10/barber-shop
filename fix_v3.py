import os

path = 'panel.html'
if not os.path.exists(path):
    print(f"File {path} not found")
    exit(1)

with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Sidebar Nav onclicks
c = c.replace('<a href="#" class="sb-item active" data-view="dashboard">', '<a href="#" class="sb-item active" data-view="dashboard" onclick="window.showView(\'dashboard\')">')
c = c.replace('<a href="#" class="sb-item" data-view="agenda">', '<a href="#" class="sb-item" data-view="agenda" onclick="window.showView(\'agenda\')">')
c = c.replace('<a href="#" class="sb-item" data-view="clients">', '<a href="#" class="sb-item" data-view="clients" onclick="window.showView(\'clients\')">')
c = c.replace('<a href="#" class="sb-item" data-view="services">', '<a href="#" class="sb-item" data-view="services" onclick="window.showView(\'services\')">')
c = c.replace('<a href="#" class="sb-item" data-view="reports">', '<a href="#" class="sb-item" data-view="reports" onclick="window.showView(\'reports\')">')

# 2. Overlay CSS Display & Click Block
c = c.replace('.sidebar-overlay {', '.sidebar-overlay {\n      pointer-events: none;')
c = c.replace('.sidebar-overlay.visible {', '.sidebar-overlay.visible {\n      display: block;\n      pointer-events: auto;')

# 3. GLOBAL FUNCTIONS (Early exposure for onclick reliability)
exposure = """
      // NUCLEAR MOBILE FIX: Early global exposure
      window.openSidebar = () => { 
        const sb = document.getElementById('sidebar');
        const ov = document.getElementById('overlay');
        if(sb) sb.classList.add('open'); 
        if(ov) { ov.style.display = 'block'; setTimeout(() => ov.classList.add('visible'), 5); }
      };
      window.closeSidebar = () => { 
        const sb = document.getElementById('sidebar');
        const ov = document.getElementById('overlay');
        if(sb) sb.classList.remove('open'); 
        if(ov) { ov.classList.remove('visible'); setTimeout(() => ov.style.display = 'none', 300); }
      };
      window.showView = (name) => { 
        window.currentView = name; 
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active')); 
        document.querySelectorAll('.sb-item').forEach(i => i.classList.remove('active')); 
        const el = document.getElementById('view-' + name); 
        if (el) el.classList.add('active'); 
        const sb = document.querySelector('.sb-item[data-view="' + name + '"]'); 
        if (sb) sb.classList.add('active'); 
        
        const isDash = name === 'dashboard'; 
        const isNarrow = window.innerWidth <= 900; 
        const dNav = document.getElementById('dash-nav');
        if(dNav) dNav.style.display = isDash && !isNarrow ? 'flex' : 'none'; 
        const dSub = document.getElementById('dash-subbar');
        if(dSub) dSub.style.display = isDash && isNarrow ? 'flex' : 'none'; 
        const tDate = document.getElementById('topbar-date');
        if(tDate) tDate.style.display = isDash ? 'none' : 'block'; 
        
        if(typeof renderView === 'function') renderView(name); 
        window.closeSidebar(); 
      };
      window.setDashView = (v) => { window.dashViewType = v; if(typeof renderDashboard === 'function') renderDashboard(); };
      window.navPrev = () => { window.dashSelectedDate.setDate(window.dashSelectedDate.getDate() - (window.dashViewType === 'week' ? 7 : 1)); if(typeof renderDashboard === 'function') renderDashboard(); };
      window.navNext = () => { window.dashSelectedDate.setDate(window.dashSelectedDate.getDate() + (window.dashViewType === 'week' ? 7 : 1)); if(typeof renderDashboard === 'function') renderDashboard(); };
      window.navToday = () => { window.dashSelectedDate = new Date(); if(typeof renderDashboard === 'function') renderDashboard(); };
"""
c = c.replace("'use strict';", "'use strict';" + exposure)

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print("Successfully applied Mobile Nuclear Option fixes.")
