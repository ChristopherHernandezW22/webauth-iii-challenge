const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, checkRole("admin"), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    Users.insert({ username, password: bcrypt.hashSync(password, 8) })
    .then(id => {
        res.status(201).json({ message: "User registered.", id });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error registering user." });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    Users
        .findByUsername(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: "You logged in." });
            } else {

            }
        })
})

function checkRole(role) {
  return function(req, res, next) {
    if (req.token && role === req.token.role) {
      next();
    } else {
      res
        .status(403)
        .json({ message: `You have no power here, you must be an ${role}` });
    }
  };
}

module.exports = router;