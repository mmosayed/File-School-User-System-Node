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

app.get('/class/add', (req, res) => {
  // Gathering the Query Data
  const className = req.query.class;
  const {name, city} = req.query;
  const age = parseInt(req.query.age);
  const grade = parseInt(req.query.grade);

  // Check if all query data is present
  if (!className || !name || !age || !city || !grade) {
    res.json({ error: 'Please fill out all the information for the student' });
    return;
  }

  FileService.fileToJSON(className, (err, data) => {
    let json;
    // Check if file exists
    if (err) {
      json = { students: [] };
    }
    else {
      json = data; 
    }
    json.students.push({name, age, city, grade});
    
    FileService.JSONtoFile(className, json, (err) => {
      console.log(err);
      res.json({
        added: {name, age, city, grade},
        class: className
      });
    });
  });

});



app.listen(port, () => {
  console.log(`User System running on Port: ${port}`);
});