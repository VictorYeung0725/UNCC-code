//this application is able to edit read and rename and delete the file with node.js fs module
const fs = require('fs/promises');
const { Buffer } = require('buffer');
//three ways for read file
//1. promise api
//2. callback api
//3. synchrnos api

//first step is to open the file (file discriptor) just a number that represent the file in memory
// then can read the file
// remember to close the file to prevent memory leak

//here mainly use promise api // only use callback api if the performance is critical
(async () => {
  const commandFileHandler = await fs.open('./command.txt', 'r');

  const watcher = fs.watch('./command.txt');

  //here we watch the file changed type to monitor the change
  for await (const event of watcher) {
    console.log(event.eventType);
    if (event.eventType === 'change') {
      console.log(event, 'the file is changed');

      //get the size of the file
      const size = (await commandFileHandler.stat()).size;
      const buff = Buffer.alloc(size);
      const offset = 0;
      const length = buff.byteLength;
      const position = 0;

      const content = await commandFileHandler.read(
        buff,
        offset,
        length,
        position
      );
      console.log(content);
    }
  }
})();
