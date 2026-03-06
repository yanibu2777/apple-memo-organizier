import OpenAI from "openai";
import fs from "fs";
import { showProgress } from "./utils/progress.js";
import { stage1SystemPrompt } from "./prompts/audit.js";

const client = new OpenAI();

// Load my notes
let raw = fs.readFileSync("notes-data.json", "utf-8");
if (raw.charCodeAt(0) === 0xFEFF) {
    raw = raw.slice(1);
}
const notes = JSON.parse(raw);


// Process in batches
const BATCH_SIZE = 20;
const results = [];

for (let i = 0; i < 20; i += BATCH_SIZE) {
    showProgress(i, notes.length);
    const batch = notes.slice(i, i + BATCH_SIZE);

    const response = await client.chat.completions.create({
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
    });
    const batch_result = JSON.parse(response.choices[0].message.content);
    results.push(...batch_result.notes);
}

showProgress(notes.length, notes.length);

console.log(JSON.stringify(results, null, 2));
