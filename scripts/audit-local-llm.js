import fs from "fs";
import { showProgress } from "../utils/progress.js";
import { stage1SystemPrompt } from "../prompts/audit.js";

// Load my notes
let raw = fs.readFileSync("notes-data.json", "utf-8");
if (raw.charCodeAt(0) === 0xFEFF) {
    raw = raw.slice(1);
}
const notes = JSON.parse(raw);


// Process in batches
const BATCH_SIZE = 5;
const PARALLEL_LIMIT = 1;

const results = [];

for (let i = 0; i < notes.length; i += BATCH_SIZE * PARALLEL_LIMIT) {
    showProgress(i, notes.length);
    const promises = [];

    for (let j = 0; j < PARALLEL_LIMIT; j++) {
        const start = i + (j * BATCH_SIZE);
        if (start >= notes.length) break;
        const batch = notes.slice(start, start + BATCH_SIZE);

        promises.push(
            fetch("http://localhost:11434/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "mistral:7b",
                    messages: [
                        { role: "system", content: stage1SystemPrompt },
                        { role: "user", content: JSON.stringify(batch) }
                    ],
                    stream: false,
                    format: "json",
                    options: {
                        num_ctx: 8192
                    }
                })
            }).then(res => res.json())
        );
    }

    const responses = await Promise.all(promises);
    for (const res of responses) {
        const batch_result = JSON.parse(res.message.content);
        results.push(...batch_result.notes);
    }
}

showProgress(notes.length, notes.length);

console.log(JSON.stringify(results, null, 2));
