require('dotenv').config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const port = process.env.PORT || 3000;
const app  = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname,'public', 'htmlFiles', 'index.html'));
});
app.get('/login', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'htmlFiles', 'login.html'));
});
app.get('/signUp', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'htmlFiles', 'signUp.html'));
});
app.listen(port, () =>{
  console.log(`App is now running at: http://localhost:${port}`)
});