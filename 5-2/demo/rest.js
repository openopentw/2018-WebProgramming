const express = require('express');
const app = express();

app.use(express.json());

const users = [
  {
    name: 'ric',
    age: 18
  }
];

app.get('/users', function (req, res) {
  res.json(users);
});

app.post('/users', function (req, res) {
  console.log(req.body);
  users.push(req.body);
  res.status(200).send('ok');
});

app.put('/users/:name', function (req, res) {
  const index = users.findIndex(user => username === req.params.name);
  user[index] = req.body;
  res.json(req.body);
});

app.delete('/users/:name', function (req, res) {
  const index = users.findIndex(user => username === req.params.name);
  if (index > -1) {
    users.splice(index, 1);

    res.status(200).json({
      success: true,
      message: `user '${req.params.name}' is deleted.`,
    });
  } else {
    res.status(400).json({
      success: false,
      message: `No user found !`,
    });
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
