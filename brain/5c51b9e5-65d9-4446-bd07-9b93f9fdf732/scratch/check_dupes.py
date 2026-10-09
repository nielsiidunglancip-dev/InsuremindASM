import re
from collections import Counter

with open(r'd:\AI\Antigravity\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

ids = re.findall(r'id="([^"]+)"', html)
dupes = [(id_, count) for id_, count in Counter(ids).items() if count > 1]

if dupes:
    print('DUPLICATE IDs FOUND:')
    for id_, count in sorted(dupes, key=lambda x: -x[1]):
        print(f'  [{count}x] #{id_}')
else:
    print('OK: No duplicate IDs found.')
