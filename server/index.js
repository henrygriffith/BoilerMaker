//our sequelize instance is created in db.js
const db = require('./db/index.js')
//our server we created is at previous entry point server.js
const app = require('./server');
const port = process.env.PORT || 3000

db.sync()
  .then(function(){
      app.listen(port,
       function () {
        console.log("Knock, knock");
        console.log("Who's there?");
        console.log(`Your server, listening on port ${port}`);
      })
  })

module.exports = db;