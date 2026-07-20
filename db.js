const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname,'database', 'users.json');

if(!fs.existsSync(DB_FILE)){
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
};
function readUsers(){
  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(raw)
};
function writeUsers(users){
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
};
function findUserByEmail(email){
  const users = readUsers();
  return users.find( u => u.email === email);
};
function addUser({email, passwordHash}){
  const users = readUsers();
  const newUser = {
    id: Date.now(),
    email,
    passwordHash,
    createdAt : new Date().toISOString()
  }
  users.push(newUser);
  writeUsers(users);
  return newUser;
}

module.exports = {findUserByEmail, addUser}