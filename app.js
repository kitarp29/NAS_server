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


     var username= req.body.email;
  var password = req.body.password;
  var ipAddress= req.headers['x-forwarded-for'];

  if(ipAddress=="" && username=="test@gmail.com" && password=="1234"){
  res.redirect("YHA LINK HOGA JISPE REDIRECT KARNA HAI");
  }
  else
  {
    res.send("Invalid Credentials");
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})