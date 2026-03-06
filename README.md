# Apple Memo Organizer

A tool that uses AI to analyze and organize Apple Notes.

## Setup

1. Install dependencies:
   ```bash
   npm install
Set your OpenAI API key:
export OPENAI_API_KEY="your-key-here"
Usage
./run.sh           # uses cached notes if available
./run.sh --fresh   # re-fetches notes from Apple Notes
How it works
fetch-memo.js - Extracts all notes from Apple Notes (JXA)
audit.js - Sends notes to OpenAI for categorization (Node.js)
stage1-audit-report.json - Output with categories and suggested actions
Output
Each note gets:
content_type - category (e.g., todo_list, project_notes)
state - empty, outdated, useful, or mixed
action - DELETE, KEEP, ARCHIVE, or NEEDS_REVIEW
keywords - topic words for grouping
entities - specific names/projects mentioned
summary - one sentence description
File Structure
├── fetch-memo.js      # JXA script to extract notes
├── audit.js           # Node.js script for AI analysis
├── run.sh             # Runner script
├── prompts/
│   └── audit.js       # LLM prompts
└── utils/
    └── progress.js    # Shared utilities

---