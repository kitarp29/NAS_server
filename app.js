const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const http = require("http");


app.use(bodyParser.urlencoded({ extended: false })); 

const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
    //res.send("done");
})

app.post('/submit', (req, res) => {
    console.log(req.body);
    console.log(req.headers['x-forwarded-for']);
  const rs = {
     username: req.body.email,
  password: req.body.password
  }
  res.send(rs);

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})