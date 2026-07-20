require('dotenv').config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const port = process.env.PORT || 3000;
const app  = express();
const session = require("express-session")
const {hashPassword, verifyPassword} = require('./hash');
const {findUserByEmail, addUser} = require('./db');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'change-this-secret-in-your-env-file',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));
app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname,'public', 'htmlFiles', 'index.html'));
});
app.get('/login', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'htmlFiles', 'login.html'));
});
app.get('/signUp', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'htmlFiles', 'signUp.html'));
});
app.post('/signUpDetails', async (req, res) =>{
  const email = req.body['user-email'];
  const password = req.body['user-password'];
  try{
    if(!email || !password){
      res.status(400).send("Email and Password are required!")
    };
    if (findUserByEmail(email)){
      res.status(409).send("An account already exists with this email")
    }
    const passwordHash = hashPassword(password);
    addUser({email, passwordHash});
    req.session.userEmail = email;
    res.redirect('/')
  } catch(err){
    console.error(err);
    res.status(500).send("Something went wrong while creating the account!")
  }
})
app.post('/loginDetails', async (req, res) =>{
  const email = req.body['user-email'];
  const password = req.body['user-password'];
  
  try{
    if (!email || !password){
      res.status(400).send("Email and Password are required to login!");
    }
    user = findUserByEmail(email)
    if(!user){
      res.status(401).send("Invalid email or password!");
    };
    const match = verifyPassword(password, user.passwordHash);
    if(!match){
      res.status(401).send("Invalid email or password!");
    }
    req.session.userEmail = email;
    res.redirect('/')
    } catch(err){
      console.error(err);
      res.status(500).send("Something went wrong while logging in!")
    }
  })
app.post('/logout', (req, res) =>{
  req.session.destroy(() =>{
    res.redirect('/login')
  });
});
app.listen(port, () =>{
  console.log(`App is now running at: http://localhost:${port}`)
});