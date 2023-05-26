const router = require("express").Router();
const { Comment } = require("../../models");

// POST Comment
router.post("/", async (req, res) => {
  try {
    const newCommentData = await Comment.create({
      content: req.body.content,
      postId: req.body.postId,
      userId: req.body.userId,
    });

    res.status(200).json(newCommentData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
