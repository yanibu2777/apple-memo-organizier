import fs, { readFileSync } from 'fs';

let raw = readFileSync("data/action-plan.json", "utf-8");
if (raw.charCodeAt(0) === '0xFEFF') {
    raw = raw.slice(1);
}

const action_plan = JSON.parse(raw, null, 2);

