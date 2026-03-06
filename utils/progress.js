export function showProgress(current, total) {
    const percent = Math.round((current / total) * 100);
    const bar = "=".repeat(Math.floor(percent / 5)) + " ".repeat(20 - Math.floor(percent / 5));
    process.stderr.write(`\rProcessing: [${bar}] ${percent}% (${current}/${total})`);
}