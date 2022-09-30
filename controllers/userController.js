const { User } = require("../models");

// Get users
const userController = {
  getAllUsers(req, res) {
    User.find()
      .populate("comments")
      .then(async (users) => {
        const userObj = { users };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Single user, by ID
  getUserById({ params }, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("comments")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No users found with that ID" })
          : res.json({ user })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a new user
  createNewUser(req, res) {
    User.create(req.body).then((user) => res.json(user))
    .catch((err) => res.status(500).jsone(eff));
  },


  // Update existing users
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
  // Getting rid of useless people 
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No users found with that Id." });
        }
      })
      .then(() => res.json({ message: "User deleted." }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  };

module.exports = userController;