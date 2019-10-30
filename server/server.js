const path = require('path')
const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')
const morgan = require('morgan')
const bodyParser = require('body-parser')

//-----------logging middleware-------------//
app.use(morgan('dev'))

//-----------static middleware--------------//
app.use(express.static(path.join(__dirname, '../public')))

//---------body parsing middleware----------//
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//-------------session middleware-----------//
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  resave: false,
  saveUninitialized: false,
}))

//-----------initializing passport----------//
app.use(passport.initialize())
app.use(passport.session())

//------------Serialization-----------------//
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
})
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(() => done(null, user))
    .catch(done);
})

//----------------api routes----------------//
app.use('/api', require('./api'))
app.use('/auth', require('./api/auth.js'))


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });


app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app

