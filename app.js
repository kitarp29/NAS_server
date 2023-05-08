const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const http = require("http");
const multer = require('multer');


app.use(bodyParser.urlencoded({ extended: false })); 

const port = 3000

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/login', (req, res) => {
  var username= req.body.email;
  var password = req.body.password;
  // var ipAddress= req.headers['x-forwarded-for'];

  if(username=="test@gmail.com" && password=="1234"){
    res.sendFile(path.join(__dirname, '/page2.html'));
  }
  else
  {
    res.send("Invalid Credentials");
  }

})

app.post('/read', (req, res) => {
  res.redirect("YHA LINK HOGA JISPE REDIRECT KARNA HAI");
})

app.post('/readByMobile', (req, res) => {
  res.send("YHA LINK HOGA JISPE REDIRECT KARNA HAI");
})

app.post('/write', upload.single('myFile'), (req, res) => {
  // Do something with the file
  res.send('File uploaded!');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})