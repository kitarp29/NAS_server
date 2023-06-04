const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const http = require("http");
const multer = require('multer');
const { Client, Account, ID } =require("appwrite");


app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static('public'));

const port = 3000

app.use(express.json());

const client = new Client();

// Initialize Appwrite SDK
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('641df18f7ccc81f2d854'); // Replace with your Appwrite project ID
  const account = new Account(client);


// Create a new user
app.post('/emailregister', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const response = await account.create(ID.unique(), email, password, name);
    res.sendFile(path.join(__dirname, '/page2.html'));
  } catch (error) {
  
    res.status(500).json({ error: error.message });
  }
});

// Log in an existing user
app.post('/emaillogin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await account.createEmailSession(email, password);
    res.sendFile(path.join(__dirname, '/page2.html'));
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

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
    res.sendFile(path.join(__dirname, '/Sindex.html'));
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

app.get('/Slogin', (req, res) => {
  res.sendFile(path.join(__dirname, '/Slogin.html'));
})

app.get('/Sregister', (req, res) => {
  res.sendFile(path.join(__dirname, '/Sregister.html'));
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