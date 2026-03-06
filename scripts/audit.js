import 'dotenv/config';
import OpenAI from "openai";
import fs from "fs";
import { showProgress } from "../utils/progress.js";
import { stage1SystemPrompt } from "../prompts/audit.js";

const client = new OpenAI();

// Load my notes
let raw = fs.readFileSync("data/notes-data.json", "utf-8");
if (raw.charCodeAt(0) === 0xFEFF) {
    raw = raw.slice(1);
}
const notes = JSON.parse(raw);


// Process in batches
const BATCH_SIZE = 20;
const results = [];

const PARALLEL_LIMIT = 5;


for (let i = 0; i < notes.length; i += BATCH_SIZE * PARALLEL_LIMIT) {
    showProgress(i, notes.length);
    const promises = [];

    for (let j = 0; j < PARALLEL_LIMIT; j++) {
        const start = i + (j * BATCH_SIZE);
        if (start >= notes.length) break;
        const batch = notes.slice(start, start + BATCH_SIZE);

        promises.push(client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: stage1SystemPrompt
                },
                {
                    role: "user",
                    content: JSON.stringify(batch)
                }
            ],
            response_format: { type: "json_object" }
        }));
    }

    const responses = await Promise.all(promises);
    for (const res of responses) {
        const batch_result = JSON.parse(res.choices[0].message.content);
        results.push(...batch_result.notes);
    }
}

showProgress(notes.length, notes.length);

console.log(JSON.stringify(results, null, 2));
