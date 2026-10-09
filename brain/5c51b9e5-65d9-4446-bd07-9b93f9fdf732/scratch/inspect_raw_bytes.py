import os
workspace_dir = r"d:\AI\Antigravity"
index_html_path = os.path.join(workspace_dir, "index.html")

with open(index_html_path, "rb") as f:
    content = f.read()

# Let's search for the closing section around "Simulasi Ujian"
match_str = b"Simulasi Ujian"
idx = content.find(match_str)
if idx != -1:
    snippet = content[idx:idx+300]
    print(snippet)
else:
    print("Not found")
