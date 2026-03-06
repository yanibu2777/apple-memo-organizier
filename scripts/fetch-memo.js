ObjC.import('Foundation');


function showProgress(current, total) {
    const percent = Math.round((current / total) * 100);
    const bar = "=".repeat(percent / 5) + " ".repeat(20 - percent / 5);
    const text = `\rProcessing: [${bar}] ${percent}% (${current}/${total})`;

    $.NSFileHandle.fileHandleWithStandardError
        .writeData($.NSString.alloc.initWithString(text).dataUsingEncoding($.NSUTF8StringEncoding));
}


// 1. Get the Notes app
const Notes = Application("Notes");
console.log("Notes App Connected")

// 2. Get all notes as an array
const allNotes = Notes.notes();
const total = allNotes.length;

console.log("Extracted all notes from notes app")
console.log("Starting to Process")
// 3. Extract information I need from the array
const result = allNotes.map((note, index) => {
    showProgress(index + 1, total);
    return {
        id: index,
        name: note.name(),
        body: note.plaintext(),
        charCount: note.plaintext().length,
        creationDate: note.creationDate(),
        modificationDate: note.modificationDate(),
        containerName: note.container().name()
    }
})
showProgress(total, total);

// 4. Convert to text string becasue osascript only 
// prints to terminal in text format

JSON.stringify(result, null, 2);