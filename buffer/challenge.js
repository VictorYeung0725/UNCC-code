//try to allocate exctaly below memory to below raw data
//0110 1000 0110 1001 0010 0001

const { Buffer } = require('buffer');

const memoryAllocation = Buffer.alloc(3);
console.log(memoryAllocation);

memoryAllocation[0] = 0x48;
memoryAllocation[1] = 0x69;
memoryAllocation[2] = 0x21;

console.log(memoryAllocation);
console.log(memoryAllocation.toString('utf-8'));
