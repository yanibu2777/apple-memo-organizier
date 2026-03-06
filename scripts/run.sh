#!/bin/bash
set -e

# Use --fresh to force re-fetch
if [ "$1" = "--fresh" ]; then
    rm -f notes-data.json
fi

if [ -s notes-data.json ]; then
  echo "=== Skipping fetch (notes-data.json exists) ==="
  echo "    Use ./run.sh --fresh to re-fetch"
else
  echo "=== Step 1: Fetching notes ==="
  osascript -l JavaScript scripts/fetch-memo.js > data/notes-data.json
fi

echo ""
echo "=== Step 2: Running audit ==="
node scripts/audit.js > data/stage1-audit-report.json


echo ""
echo "=== Done! Results saved to stage1-audit-report.json ==="