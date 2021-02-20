const db = require("../models");
const User = db.users;
var add = require('date-fns/add');

//* create a users
exports.createuser = (req, res) => {
  if (!req.body.email) {
    res.status(400).send({ message: "Email field can't be empty"});
    return;
  }

  // * create an object
  let today = new Date()
  let expires = add(today, { minutes: 20})
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    about: req.body.about, 
    phone: req.body.phone,
    expiresAt: expires// 20 min expiry
  })

  // * Save new user in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// * retrieve user by id
exports.retriveuser = (req, res) => {
  var id = req.params.id 

  User.findById(id)
  .then(data => {
    if (!data)
      res.status(404).send({ message: "Not found user with id " + id });
    else res.send(data);
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving user with id=" + id });
  });

};


// * retrieve user by id
exports.updateuser = (req, res) => {
  var id = req.params.id 

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update user with id=${id}. Maybe user was not found!`
      });
    } else res.send({ message: "User was updated successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating user with id=" + id
    });
  });

};
