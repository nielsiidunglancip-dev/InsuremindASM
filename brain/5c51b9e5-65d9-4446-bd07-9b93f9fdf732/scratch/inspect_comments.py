import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

workspace_dir = r"d:\AI\Antigravity"
app_js_path = os.path.join(workspace_dir, "app.js")

with open(app_js_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total lines in app.js: {len(lines)}")
comments_count = 0
for idx, line in enumerate(lines):
    line_num = idx + 1
    stripped = line.strip()
    if stripped.startswith("//"):
        comments_count += 1
        # If the comment contains characters like (, =, {, }, ;, or typical JS keywords, print it
        # to manually inspect if it looks like commented-out code.
        is_suspicious = any(c in stripped for c in ['(', '=', '{', '}', ';', '[', ']']) or \
                        any(word in stripped.lower() for word in ['function', 'const', 'let', 'var', 'if', 'else', 'document', 'window', 'return'])
        if is_suspicious:
            print(f"[Line {line_num}] {stripped}")

print(f"Total comments found: {comments_count}")
