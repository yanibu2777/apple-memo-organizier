# Performance Notes

## Local LLM (Mistral 7B via Ollama)

- **Batch size**: 10
- **Parallel**: 1
- **Result**: Crashed at ~20% after 30 minutes
- **Error**: `truncating input prompt` limit=8192 prompt=12437
- **Root cause**: Context window (8192) exceeded by JSON batch (12437 tokens)
- **Outcome**: Malformed JSON → `batch_result.notes is not iterable`

## OpenAI (gpt-4o-mini)

- **Batch size**: 20
- **Parallel**: 5
- **Speed**: ~100 notes/min
- **Total time**: ~6 min for 532 notes
- **Result**: Success, reliable JSON output

## Takeaway

For batch JSON workloads, gpt-4o-mini is ~10x faster and far more reliable than local 7B models. Local LLMs are better suited for single-item, shorter prompts where context window isn't a constraint.