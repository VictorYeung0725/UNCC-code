const { Buffer } = require('buffer');

//allocate a peice of memory into buffer in node.js
const memoryContainer = Buffer.alloc(4); // allocate 4 bytes = 32 bits

// console.log(memoryContainer);
// console.log(memoryContainer[0]);

memoryContainer[0] = 0xf4;
memoryContainer[1] = 0x34;
memoryContainer[2] = 0xb6;

//below is how we can write negative value in buffer
// memoryContainer.writeInt8(-34, 2);
memoryContainer[3] = 0xff;
console.log(memoryContainer);
console.log(memoryContainer[0]);
console.log(memoryContainer[1]);
// console.log(memoryContainer.readInt8(2));
console.log(memoryContainer[3]);
