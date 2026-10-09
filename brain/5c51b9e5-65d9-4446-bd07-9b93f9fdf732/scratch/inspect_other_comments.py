import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

workspace_dir = r"d:\AI\Antigravity"
files_to_scan = ["ai-coach.js", "server.js", "data.js"]

for filename in files_to_scan:
    filepath = os.path.join(workspace_dir, filename)
    if not os.path.exists(filepath):
        continue
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()

    print(f"\n=== Suspicious Comments in {filename} (Total lines: {len(lines)}) ===")
    comments_count = 0
    for idx, line in enumerate(lines):
        line_num = idx + 1
        stripped = line.strip()
        if stripped.startswith("//"):
            comments_count += 1
            is_suspicious = any(c in stripped for c in ['(', '=', '{', '}', ';', '[', ']']) or \
                            any(word in stripped.lower() for word in ['function', 'const', 'let', 'var', 'if', 'else', 'document', 'window', 'return'])
            if is_suspicious:
                print(f"[Line {line_num}] {stripped}")
    print(f"Total comments found: {comments_count}")
