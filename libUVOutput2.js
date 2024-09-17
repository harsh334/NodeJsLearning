const fs = require("fs");

setImmediate (() => console.log("setImmediate"));

setTimeout(() => console.log("Timer expired"), 0);

Promise.resolve("promise").then(() => console.log("Promise"));

fs.readFile("./file.txt", "utf8", () => {
   setTimeout(() => console.log("2nd timer"), 0);
   process.nextTick(() => console.log("2nd nextTick"));
   setImmediate (() => console.log(" 2nd setImmediate"));
   console.log("File Reading CB");
});
process.nextTick(()  => console.log("nextTick"));

console.log("Last line of the file.");

/* output - 
Last line of the file.
nextTick
Promise
Timer expired
setImmediate
File Reading CB
2nd nextTick
2nd setImmediate   // this settimeediate will be called before settimeout because when the eventloop is ideal ,it rests in the poll phase and once poll phase gets completed it starts right from there and not from the start(setinterval)
2nd timer
*/