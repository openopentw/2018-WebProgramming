const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/post/:id', function (req, res) {
  res.send(req.params.id);
});

app.listen(3000, () => console.log('hi 3000')) // listen on 3000 port
