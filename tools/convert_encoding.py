#!/usr/bin/env python3
"""
Scan the repository for text files and re-encode any file that is not UTF-8.
Backs up original files with a `.bak` suffix before changing them.

Usage: python tools/convert_encoding.py
"""
from pathlib import Path
import sys

EXTS = {'.html', '.css', '.py', '.js', '.ts', '.tsx', '.jsx', '.json', '.md', '.txt'}
root = Path(__file__).resolve().parent.parent
converted = []

for p in root.rglob('*'):
    if not p.is_file():
        continue
    if p.suffix.lower() not in EXTS:
        continue
    # skip git dir and node_modules
    if any(part in ('node_modules', '.git') for part in p.parts):
        continue
    b = p.read_bytes()
    try:
        b.decode('utf-8')
        # already utf-8
    except Exception:
        try:
            txt = b.decode('latin-1')
        except Exception:
            # can't decode, skip
            print('SKIP (undecodeable):', p)
            continue
        bak = p.with_suffix(p.suffix + '.bak')
        if not bak.exists():
            bak.write_bytes(b)
        p.write_bytes(txt.encode('utf-8'))
        converted.append(str(p))

print('Converted files:', len(converted))
for c in converted:
    print(' -', c)

if converted:
    print('\nDone. Review changes and run git diff to inspect.')
else:
    print('Nothing to convert.')
