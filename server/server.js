const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('bodyParser')

//-----------logging middleware-------------//
app.use(morgan('dev'))

//-----------static middleware--------------//
app.use(express.static(path.join(__dirname, '../public')))

//---------body parsing middleware----------//
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//----------------api routes----------------//
app.use('/api', require('./api'))


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });


app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

