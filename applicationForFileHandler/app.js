//this application is able to edit read and rename and delete the file with node.js fs module
const fs = require('fs/promises');
const { Buffer } = require('buffer');

//first step is to open the file (file discriptor) just a number that represent the file in memory
// then can read the file
// remember to close the file to prevent memory leak

//here mainly use promise api // only use callback api if the performance is critical
(async () => {
  const CREATE_FILE = 'create a file';
  const DELETE_FILE = 'delete a file';
  const RENAME_FILE = 'rename a file';
  const ADD_CONTENT_TO_FILE = 'add content to file';

  const createFile = async (path) => {
    try {
      //check whether or not file already exist
      const existingFileHandler = await fs.open(path, 'r');
      //close the file after checking
      existingFileHandler.close();
      return console.log(`the file ${path} already exist `);
    } catch (error) {
      //if error, we dont have the file, now we create it
      const newFileHandler = await fs.open(path, 'w');
      return console.log(`the file ${path} successfully created `);
    }
  };

  const deleteFile = async (path) => {
    console.log(`Deleting ${path}`);
    // try {
    //   const existingFileHandler = await fs.open(path, 'r');
    // } catch (error) {}
  };

  const renameFile = async (oldPath, newPath) => {
    console.log(`Rename file from ${oldPath} to ${newPath}`);
  };

  const addToFile = async (path, content) => {
    console.log(`Adding ${content} to this ${path}`);
  };

  const commandFileHandler = await fs.open('./command.txt', 'r');
  commandFileHandler.on('change', async () => {
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

    //create a file
    //create a file<path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    //delete a file
    //delete a file<path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE + 1);
      deleteFile(filePath);
    }

    //rename a file
    //rename a file <path> to <newPath>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(' to ');
      const oldPath = command.substring(RENAME_FILE + 1, _idx);
      const newPath = command.substring(_idx + 4);

      renameFile(oldPath, newPath);
    }

    //add to file
    //add to file <path> this content:<content>
    if (command.includes(ADD_CONTENT_TO_FILE)) {
      const _idx = command.indexOf(' this content: ');
      const filePath = command.substring(ADD_CONTENT_TO_FILE + 1, _idx);
      const content = command.substring(_idx + 15);
      addToFile(filePath, content);
    }
  });

  const watcher = fs.watch('./command.txt');
  //here we watch the file changed type to monitor the change
  for await (const event of watcher) {
    commandFileHandler.emit('change');
  }
})();
