//this application is able to edit read and rename and delete the file with node.js fs module
const fs = require('fs/promises');

//three ways for read file
//1. promise api
//2. callback api
//3. synchrnos api

//first step is to open the file (file discriptor) just a number that represent the file in memory

// then can read the file

// remember to close the file to prevent memory leak

//here mainly use promise api // only use callback api if the performance is critical
(async () => {
  const watcher = fs.watch('./command.txt');

  //here we watch the file changed type to monitor the change
  for await (const event of watcher) {
    console.log(event.eventType);
    if (event.eventType === 'change') {
      console.log(event, 'the file is changed');
    }
  }
})();
