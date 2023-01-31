require('dotenv').config();
const bcrypt = require('bcrypt');

const saltRounds = Number(process.env.SALT);
const password = process.env.PW;
const hashedPw = process.env.HASHEDPW;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
};

hashPassword(password);

const login = async (pw, hashedPw) => {
  const result = await bcrypt.compare(pw, hashedPw);
  if (result) {
    console.log('Successful compare, logged in!');
  } else {
    console.log('Unsuccessful compare ');
  }
};

login(password, hashedPw);
const checkUser = async (username, password) => {
  //... fetch user from a db etc.

  const match = await bcrypt.compare(password, user.passwordHash);

  if (match) {
    //login
  }

  //...
};
