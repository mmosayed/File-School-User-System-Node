const FileService = require('./services/file');

const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/class/list', (req, res) => {
  const className = req.query.class;
  
  // 0 - Check if file exists
  // 1 - Be able to Read the file
  // 2 - Parse the data from the file
  // 3 - Show the parsed data back to the user

  FileService.fileToJSON(className, (err, json) => {
    console.log('err', err);
    console.log('data', json);

    if (err) {
       res.json({ error: `Class ${className} doesn't exist.`});
       return;
    }

    res.json(json);
  });
  
});



app.listen(port, () => {
  console.log(`User System running on Port: ${port}`);
});