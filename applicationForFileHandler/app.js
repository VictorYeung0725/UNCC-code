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

  //restructure the code with event emitter
  commandFileHandler.on('change', async () => {
    console.log(event, 'the file is changed');

    //get the size of the file
    const size = (await commandFileHandler.stat()).size;
    //and allocate the buffer with the size of file
    const buff = Buffer.alloc(size);
    //the location which we want to filter the position
    const offset = 0;
    //how many byte to read
    const length = buff.byteLength;
    //the position where start to read the file from
    const position = 0;

    //we want to read the whole content (from beginning till the end)
    const content = await commandFileHandler.read(
      buff,
      offset,
      length,
      position
    );
    console.log(content);
  });
  const watcher = fs.watch('./command.txt');

  //here we watch the file changed type to monitor the change
  for await (const event of watcher) {
    console.log(event.eventType);
    commandFileHandler.emit('change');
    // if (event.eventType === 'change') {
    //   console.log(event, 'the file is changed');

    //   //get the size of the file
    //   const size = (await commandFileHandler.stat()).size;
    //   //and allocate the buffer with the size of file
    //   const buff = Buffer.alloc(size);
    //   //the location which we want to filter the position
    //   const offset = 0;
    //   //how many byte to read
    //   const length = buff.byteLength;
    //   //the position where start to read the file from
    //   const position = 0;

    //   //we want to read the whole content (from beginning till the end)
    //   const content = await commandFileHandler.read(
    //     buff,
    //     offset,
    //     length,
    //     position
    //   );
    //   console.log(content);
    // }
  }
})();
