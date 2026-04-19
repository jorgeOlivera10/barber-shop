import os

path = 'panel.html'
if not os.path.exists(path):
    print(f"File {path} not found")
    exit(1)

with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Restore missing CSS
missing_css = """    .demo-widget a {
      text-decoration: none;
      color: #555550 !important;
      font-size: 0.75rem;
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      padding: 6px 14px;
      border-radius: 30px;
      transition: 0.2s;
    }

    .demo-widget a:hover {
      background: #FFFFFF;
      color: #2A2B28 !important;
    }
"""
if '.demo-widget a {' not in c:
    c = c.replace('  </style>', missing_css + '  </style>')

# 2. Remove mangled HTML at the top
mangled_parts = [
    '<div class="demo-widget">',
    '<div class="demo-widget-label">Demo</div>',
    '<a href="index.html">Landing</a>',
    '<a href="reservar.html">Reservar</a>',
    '</div>'
]

# We'll just replace the whole block if found
import re
c = re.sub(r'<body>\s*<div class="demo-widget">.*?</div>', '<body>', c, flags=re.DOTALL)

# 3. Add correct HTML at the bottom
correct_html = """  <!-- WIDGET NAVEGADOR DEMO -->
  <div class="demo-widget">
    <div class="demo-widget-label">Demo</div>
    <a href="index.html">Isolvia</a>
    <a href="reservar.html">Cliente</a>
    <a href="panel.html">Panel</a>
  </div>
"""
if '<!-- WIDGET NAVEGADOR DEMO -->' not in c:
    c = c.replace('</body>', correct_html + '</body>')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print("Successfully fixed panel.html demo navigator.")
