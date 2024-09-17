const fs = require("fs");

setImmediate (() => console.log("setImmediate"));

setTimeout(()=> console.log("Timer expired"), 0);

Promise.resolve(() => console.log("Promise"));

fs.readFile("./file.txt", "utf8", () => {console.log("File Reading CB");});

process.nextTick(() => {
   process.nextTick(() => console.log(" inner nextTick"));
   console.log("nextTick");
});

console.log("Last-line of the file.");

/* output -
Last-line of the file.
nextTick
inner nextTick     //because nexttick will be calling again and again untill the nextTick queue is empty
Promise
Timer expired
setImmediate
File Reading CB
*/