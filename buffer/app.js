const { Buffer } = require('buffer');

//allocate a peice of memory into buffer in node.js
const memoryContainer = Buffer.alloc(4); // allocate 4 bytes = 32 bits

console.log(memoryContainer);
console.log(memoryContainer[0]);

memoryContainer[0] = 0xf4;
console.log(memoryContainer);
