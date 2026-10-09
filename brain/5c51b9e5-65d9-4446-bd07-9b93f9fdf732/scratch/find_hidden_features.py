import os
import re
import sys

# Ensure stdout handles UTF-8 correctly
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

workspace_dir = r"d:\AI\Antigravity"
app_js_path = os.path.join(workspace_dir, "app.js")
index_html_path = os.path.join(workspace_dir, "index.html")
ai_coach_path = os.path.join(workspace_dir, "ai-coach.js")
server_js_path = os.path.join(workspace_dir, "server.js")

def scan_js_file(filepath):
    print(f"=== Scanning JS File: {os.path.basename(filepath)} ===")
    if not os.path.exists(filepath):
        print("File does not exist.")
        return
        
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()
        
    # Pattern to match code in comments
    code_in_comment_pattern = re.compile(
        r'^\s*//\s*(const\s+|let\s+|var\s+|function\s+|if\s*\(|for\s*\(|while\s*\(|switch\s*\(|console\.log|alert|document\.|window\.|\$\(|return\s+|await\s+|async\s+|debugger|[\w\.]+\s*=\s*[\w\.\(\'"]|[\w\.]+\(\);|[\w\.]+\.addEventListener)'
    )
    
    # Pattern to match keywords denoting disabled/removed items
    disabled_keyword_pattern = re.compile(
        r'(todo|disabled|nonaktif|sementara|bypass|hapus|deactivate|hidden|hide|disembunyikan)', 
        re.IGNORECASE
    )
    
    comment_blocks = []
    in_block = False
    block_lines = []
    block_start = 0
    
    for i, line in enumerate(lines):
        line_num = i + 1
        stripped = line.strip()
        
        # Check single-line comments
        if stripped.startswith("//"):
            # Check if it looks like code
            if code_in_comment_pattern.match(line):
                print(f"[Line {line_num}] Commented-out Code: {stripped}")
            # Check if it mentions disabled/hidden keywords
            elif disabled_keyword_pattern.search(stripped):
                print(f"[Line {line_num}] Disabled-related Comment: {stripped}")
        
        # Check block comments /* */
        if "/*" in line and not in_block:
            in_block = True
            block_start = line_num
            block_lines = [line]
            if "*/" in line:
                in_block = False
                block_content = "".join(block_lines)
                if disabled_keyword_pattern.search(block_content) or any(kw in block_content for kw in ["const", "let", "var", "function", "if", "console.log"]):
                    print(f"[Lines {block_start}-{line_num}] Block Comment: {block_content.strip()}")
        elif in_block:
            block_lines.append(line)
            if "*/" in line:
                in_block = False
                block_content = "".join(block_lines)
                if disabled_keyword_pattern.search(block_content) or any(kw in block_content for kw in ["const", "let", "var", "function", "if", "console.log"]):
                    print(f"[Lines {block_start}-{line_num}] Block Comment: {block_content.strip()}")

def scan_html_file(filepath):
    print(f"\n=== Scanning HTML File: {os.path.basename(filepath)} ===")
    if not os.path.exists(filepath):
        print("File does not exist.")
        return
        
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Find all HTML comments <!-- -->
    html_comments = re.finditer(r'<!--(.*?)-->', content, re.DOTALL)
    for match in html_comments:
        comment = match.group(1)
        stripped_comment = comment.strip()
        # Filter for comments that contain tag elements, typical HTML structure, or disabled keywords
        # Also clean up non-ascii or print-safe representations if necessary, but sys.stdout.reconfigure helps.
        if "<" in stripped_comment or ">" in stripped_comment or any(kw in stripped_comment.lower() for kw in ["disabled", "nonaktif", "sementara", "bypass", "hapus", "hidden", "hide"]):
            # Find the line number
            start_idx = match.start()
            line_num = content[:start_idx].count("\n") + 1
            # Clean up the output string to avoid messy display
            clean_comment = " ".join(stripped_comment.split())
            print(f"[Line {line_num}] Commented-out HTML or Notes: {clean_comment[:180]}...")

if __name__ == "__main__":
    scan_js_file(app_js_path)
    scan_js_file(ai_coach_path)
    scan_js_file(server_js_path)
    scan_html_file(index_html_path)
