const router = require("express").Router();
const { User } = require("./db");

function authenticatePassword(password) {
  return password.length <= 15 && password.length >= 5; //my function
}

router.get('/me', (req, res, next) => { //ideally i want the route to be '/:username' but not set up in the model currently.
    //passport attaches the session user to the request object (req)
    res.json(req.user) //to keep a user logged-in when sending requests during a session (even after refreshing)
})

router.put("/login", (req, res, next) => {
  const user = User.findOne({
    //where: {req.body.email, req.body.password} ?destructured?
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then(user => {
      if (!user) res.status(401).send("User not found");
      else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

router.post("/signup", (req, res, next) => {
  const existingUser = User.findOne({ where: { password: req.body.password } });
  if (existingUser) res.status(303).send("User already exists");
  else {
    if (authenticatePassword(req.body.password)) { //my line
      User.create(req.body)
        .then(() => {
          req.login(user, err => {
            if (err) next(err);
            else {
              res.json(user);
            }
          });
        })
        .catch(next);
    } else
      res
        .status(401)
        .send("Invalid password. Must be between 5 and 15 characters"); //my line
  }
});

router.delete("/logout", (req, res, next) => {
    req.logout()
    res.redirect('/'); //my line
    req.session.destroy()
    req.sendStatus(204)
})

