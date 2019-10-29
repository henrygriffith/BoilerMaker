const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('bodyParser')
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});

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

