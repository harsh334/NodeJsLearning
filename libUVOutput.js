const a = 100;

const fs = require('fs');

setImmediate (()=>console.log("setImmediate"));

Promise.resolve("promise").then(()=> console.log("Promise"));

fs.readFile("./file.txt", "utf8", () => {
   console.log("File Reading CB");
});

setTimeout(()=> console.log("Timer expired"), 0);

process.nextTick(()=> console.log("process.nextTick"));

function printA() {
  console.log("a", a);
};
printA();

console.log("Last line of the file.");

/* output - 
   a 100
   Last line of the file.
   process.nextTick
   Promise
   Timer expired
   setImmediate
   File Reading CB
*/
