# Authentication Demo

## Objectives

- Apply hashing, salts, bcrypt etc into a simple app that will demo register, login and logut...

## Setup

```
npm i express ejs mongoose bcrypt
```

## Creating a model for users

User document will have username and password properties.

```
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username cannot be black'],
  },
  password: {
    type: String,
    required: [true, 'Password cannot be black'],
  },
});
```

## Setup basic express app

```
const express = require('express');
const app = express();

app.get('/secret', (req, res) => {
  res.send('This is a secret - you should be logged in.');
});

app.listen(3000, () => {
  console.log('Serving your app...');
});

```

## User registration

res.render('register') will render a ejs template with the user form.

```
app.get('/register', (req,res) => {
  res.render('register')
})
```

In the register.ejs view, we will have a form to allow for a user to register. Once submited it should redirect user to '/' route

## Submiting registration form to POST route

Set up post route to check it is working.. send back req.body `-` which will be the username and password the user will submit.

```
app.post('register', async (req,res) => {
  res.send(req.body)
})
```

- Hash password
- Create new user from user model
- Error checking
- Save user to mongoDB
- Redirect user...

## Login route

- Find if username is in mongoDB
- Check password is correct using `bcrypt.compare()`
- If correct, redirect user...

## How to remain logged in

- Use express-session package to store user in browser session
- ` npm i express-session`

```
const session = require('express-session')
app.use(session({
  secret: 'somesecret',
  resave: false,
  ...
}))

```

## Logout route

TODO

## Middleware

Using middleware to check if user is logged in - accessing private routes etc.

## Using Mongoose/MongoDB Middleware

- pre()
