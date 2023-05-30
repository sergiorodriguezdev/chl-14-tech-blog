const router = require("express").Router();
const { Post, Comment, User } = require("../../models");

// GET All Posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      order: [["createdOn", "DESC"]],
    });

    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET Posts by User ID
router.get("/user/:id", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      where: {
        userId: req.params.id,
      },
      order: [["createdOn", "DESC"]],
    });

    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET Post by ID and its Comments
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
      order: [["comments", "createdOn", "DESC"]],
    });

    if (!postData) {
      res.status(404).json({ message: "No Post found with this id" });
      return;
    }

    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// POST Post
router.post("/", async (req, res) => {
  try {
    const newPostData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
    });

    res.status(200).json(newPostData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// PUT Post
router.put("/:id", async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postData[0]) {
      res.status(404).json({ message: "No Post found with this id" });
      return;
    }

    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// DELETE Post
router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
