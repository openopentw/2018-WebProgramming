const express = require('express')

const router = express.Router()

router.get('/', function(req, res) {
  res.send('Index')
})

router.get('/yo', function(req, res) {
  res.send('YoYo')
})

router.get('/ya', function(req, res) {
  res.send('YaYa')
})

module.exports = router
