const { Buffer } = require('buffer');

const buffer = Buffer.alloc(10000, 0);

//Buffer
Buffer.from();
Buffer.concat();

//a ways that is faster without assigning all memory with 0
const unSafeBuffer = Buffer.allocUnsafe(10000);
for (let i = 0; i < unSafeBuffer.length; i++) {
  if (unSafeBuffer[i] !== 0) {
    console.log(
      `element at position ${i} has value: ${unSafeBuffer[i].toString(2)}`
    );
  }
}
