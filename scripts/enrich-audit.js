import fs from "fs";

let raw = fs.readFileSync("data/notes-data.json", "utf-8");
if (raw.charCodeAt(0) === 0xFEFF) {
    raw = raw.slice(1);
}
const notesData = JSON.parse(raw);

raw = fs.readFileSync("data/stage1-audit-report.json", "utf-8");
if (raw.charCodeAt(0) === 0xFEFF) {
    raw = raw.slice(1);
}
const audits = JSON.parse(raw);

const idToAppleId = new Map(
    notesData.map(note => [note.id, note.appleId])
);

audits.forEach(item => {
    item.appleId = idToAppleId.get(item.id) || null;
});

fs.writeFileSync("data/stage1-audit-report.json", JSON.stringify(audits, null, 2));
console.log(`Enriched ${audits.length} audit entries with appleId`);
