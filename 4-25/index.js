const express = require('express');

const app = express();

const user = [
  {
    name: 'john',
  },
  {
    name: 'joe',
  },
];

app.get('/users', (req, res) => {
  res.json(user);
});

app.get('/users/87', (req, res) => {
  res.json({
    a: 1,
  });
});

app.listen(3000, () => {
  console.log('running on 3000 port');
});
