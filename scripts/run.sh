#!/bin/bash
set -e

# Use --fresh to force re-fetch
if [ "$1" = "--fresh" ]; then
    mkdir -p backup-data 
    cp data/* backup-data/
    rm -f data/notes-data.json data/stage1-audit-report.json
fi

if [ "$1" = "--audit" ]; then
    cp data/* backup-data/
    rm -f data/stage1-audit-report.json
fi

if [ -s data/notes-data.json ]; then
  echo "=== Skipping fetch (notes-data.json exists) ==="
  echo "    Use ./run.sh --fresh to re-fetch"
else
  echo "=== Step 1: Fetching notes ==="
  mkdir -p backup-data && cp data/notes-data.json backup-data/
  osascript -l JavaScript scripts/fetch-memo.js > data/notes-data.json
fi


if [ -s data/stage1-audit-report.json ]; then
  echo "=== Skipping audit (stage1-audit-report.json exists) ==="
  echo "    Use ./run.sh --audit to re-audit but not re-fetch"
else
  echo "=== Step 2: Running audit ==="
  mkdir -p backup-data && cp data/stage1-audit-report.json backup-data/
  node scripts/audit.js > data/stage1-audit-report.json
  echo ""
  echo "=== Done! Results saved to data/stage1-audit-report.json ==="
fi

echo ""
echo "=== Step 3: Analyzing audit and producing an action plan ==="
node scripts/analyze.js > data/action-plan.json
echo "=== Done! Action plan saved to data/action-plan.json ==="