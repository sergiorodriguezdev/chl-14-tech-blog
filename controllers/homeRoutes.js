const router = require("express").Router();
const { User, Post, Comment } = require("../models");

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

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/posts/:id", async (req, res) => {
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

    const post = postData.get({ plain: true });

    res.render("post-page", {
      post,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/dashboard", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
        where: {
          userId: req.session.user_id,
        },
        order: [["createdOn", "DESC"]],
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render("dashboard", {
        posts,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  res.redirect("/login");
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
