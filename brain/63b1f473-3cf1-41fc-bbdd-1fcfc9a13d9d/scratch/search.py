import re

def search_file(filepath, query):
    print(f"Searching in {filepath} for '{query}'...")
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for i, line in enumerate(f, 1):
                if re.search(query, line, re.IGNORECASE):
                    print(f"Line {i}: {line.strip()[:120]}")
    except Exception as e:
        print(f"Error: {e}")

search_file(r"d:\AI\Antigravity\app.js", "generate-pptx")
search_file(r"d:\AI\Antigravity\app.js", "3001")
search_file(r"d:\AI\Antigravity\app.js", "3000")
