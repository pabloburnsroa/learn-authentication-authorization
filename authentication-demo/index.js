const express = require('express');
const app = express();
const User = require('./models/user.model');
const { default: mongoose } = require('mongoose');
const isAuthenticated = require('./middleware/isAuthenticated');

const session = require('express-session');

const bcrypt = require('bcrypt');

app.use(
  session({
    secret: 'somesecret',
    resave: false,
  })
);

app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
run().catch((err) => console.log(err));

async function run() {
  await mongoose.connect('mongodb://localhost:27017/authorization-demo');
  console.log('MongoDB Connection Open...');
}

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.send('You registered, this is a fake homepage');
});

// User Registration
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { password, username } = req.body;
  const user = await new User({ username, password });
  await user.save();
  req.session.user_id = user._id;

  req.session.save(function (err) {
    if (err) return next(err);
    res.redirect('/secret');
  });
});

// User login
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const validatedUser = await User.validateUser(username, password);
  if (validatedUser) {
    req.session.user_id = validatedUser._id;
    req.session.save(function (err) {
      if (err) return next(err);
      res.redirect('/secret');
    });
  } else {
    res.redirect('/login');
  }
});

// User logout
app.post('/logout', (req, res) => {
  // .destroy() method will destroy the session and will unset the req.session property.
  req.session.destroy();
  res.redirect('/login');
});

app.get('/secret', isAuthenticated, (req, res) => {
  res.render('secret');
});

app.listen(3000, () => {
  console.log('Serving your app...');
});
