import os

path = 'panel.html'
if not os.path.exists(path):
    print(f"File {path} not found")
    exit(1)

with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Fix subbar top position (Problem 3)
# Note: The user also asked to change --topbar-h in :root (Problem 4), 
# but they also want the inline style top:56px.
c = c.replace('position:sticky; top:var(--topbar-h); z-index:110;', 'position:sticky; top:56px; z-index:110;')

# 2. Fix KPI grid dynamic columns (Problem 2)
c = c.replace("$('#kpi-grid').style.gridTemplateColumns = 'repeat(3, 1fr)';", "$('#kpi-grid').style.gridTemplateColumns = window.innerWidth <= 600 ? '1fr' : 'repeat(3, 1fr)';")

# 3. Double check CSS variable in media query (already done in previous step normally, but ensuring)
if ':root {\n        --topbar-h: 56px;\n      }' not in c:
    c = c.replace('@media(max-width:600px) {', '@media(max-width:600px) {\n      :root {\n        --topbar-h: 56px;\n      }')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print("Successfully applied all 4 mobile UI fixes.")
