import fs from "fs";

// Load my audit
let raw = fs.readFileSync("data/stage1-audit-report.json", "utf-8");
if (raw.charCodeAt(0) === 0xFEFF) {
    raw = raw.slice(1);
}
const audits = JSON.parse(raw);

// local aggregate and analysis

// delete
const deleteIds = audits.filter(item => item.action === "DELETE").map(
    item => item.id
);

// need review
const reviewIds = audits.filter(item => item.action === "NEEDS_REVIEW").map(
    item => item.id
);

// merge
const merge_groups = {}
audits.forEach(item => {
    if (item.merge_hint) {
        const hint = item.merge_hint.toLowerCase().trim().replace(/\.+$/, '');
        if (!merge_groups[hint]) merge_groups[hint] = [];
        merge_groups[hint].push(item.id);
    }
});

const merge_groups_filtered = Object.fromEntries(
    Object.entries(merge_groups).filter(([key, ids]) => ids.length >= 2)
);

// produce action plan
const actionPlan = {
    delete: {
        count: deleteIds.length,
        ids: deleteIds
    },
    review: {
        count: reviewIds.length,
        ids: reviewIds
    },
    merge: {
        count: Object.keys(merge_groups_filtered).length,
        groups: merge_groups_filtered
    }
}
console.log(JSON.stringify(actionPlan, null, 2));