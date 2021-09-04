const express = require('express')
const path = require('path');
const parser = require('body-parser')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.use(parser.urlencoded({ extended: true}))
app.use(express.json())

app.get('/start', (req, res) => {
  res.status(200).send()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})