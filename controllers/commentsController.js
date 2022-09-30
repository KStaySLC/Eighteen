const { Comments, User } = require("../models");

module.exports = {
  // Get all the comments
  getComments(req, res) {
    Thought.find()
      .then(async (comments) => {
        const thoughtObj = { comments };
        return res.json(commentsObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single comment.  Remember when twitter was only 140 characters?
  getSingleComment(req, res) {
    Comments.findOne({ _id: req.params.commentsId })
      .select("-__v")
      .then(async (comments) =>
        !comments
          ? res.status(404).json({ message: "No comments found" })
          : res.json({ comments })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // New Comments
  createComments(req, res) {
    Comments.create(req.body)
      .then((comments) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { comments: comments._id } },
          { runValidators: true, new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User cannot be found" })
          : res.json("Success")
      )
      .catch((err) => res.status(500).json(err));
  },

  updateComments(req, res) {
    Comments.findOneAndUpdate(
      { _id: req.params.commentsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((comments) =>
        !comments
          ? res.status(404).json({ message: "No comments with this id!" })
          : res.json(comments)
      )
      .catch((err) => res.status(500).json(err));
  },
};

  deleteComments(req, res) {
    Comments.findOneAndRemove({ _id: req.params.commentsId })
      .then((comments) => {
        if (!comments) {
          res.status(404).json({ message: "No comments fond." });
        }
      })
      .then(() => res.json({ message: "comments has been deleted." }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  };