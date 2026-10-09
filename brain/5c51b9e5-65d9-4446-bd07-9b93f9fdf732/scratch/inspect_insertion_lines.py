import os
workspace_dir = r"d:\AI\Antigravity"
index_html_path = os.path.join(workspace_dir, "index.html")

with open(index_html_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for i in range(742, 755):
    if i < len(lines):
        print(f"Line {i+1}: {repr(lines[i])}")
