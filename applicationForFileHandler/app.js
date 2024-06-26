//this application is able to edit read and rename and delete the file with node.js fs module
const fs = require('fs/promises');
const { Buffer } = require('buffer');

//first step is to open the file (file discriptor) just a number that represent the file in memory
// then can read the file
// remember to close the file to prevent memory leak

//here mainly use promise api // only use callback api if the performance is critical
(async () => {
  const createFile = async (path) => {
    try {
      //check whether or not file already exist
      const existingFileHandler = await fs.open(path, 'r');
      //we do have the file
      existingFileHandler.close();
      return console.log(`the file ${path} already exist `);
    } catch (error) {
      //if error, we dont have the file, now we create it
      const newFileHandler = await fs.open(path, 'w');
      return console.log(`the file ${path} successfully created `);
    }

    //close the file after checking
  };

  const commandFileHandler = await fs.open('./command.txt', 'r');
  commandFileHandler.on('change', async () => {
    const CREATE_FILE = 'create a file';
    //get the size of the file
    const size = (await commandFileHandler.stat()).size;
    //and allocate the buffer with the size of file
    const buffer = Buffer.alloc(size);
    //the location which we want to filter the position
    const offset = 0;
    //how many byte to read
    const length = buffer.byteLength;
    //the position where start to read the file from
    const position = 0;

    //we want to read the whole content (from beginning till the end)
    await commandFileHandler.read(buffer, offset, length, position);
    const command = buffer.toString('utf-8');

    //create a file(path)
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }
  });

  const watcher = fs.watch('./command.txt');
  //here we watch the file changed type to monitor the change
  for await (const event of watcher) {
    commandFileHandler.emit('change');
  }
})();
