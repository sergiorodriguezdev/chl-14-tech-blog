const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// Home page route
router.get("/", async (req, res) => {
  try {
    // Retrieve all posts, include the user's name and order by createdOn date descending
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      order: [["createdOn", "DESC"]],
    });

    // Serialize individual posts
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render homepage template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Post page route
router.get("/posts/:id", async (req, res) => {
  try {
    // Retrieve post by ID, include the user's name, all comments (and the users who posted them) and order comments by createdOn date descending
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

    // Check there is data to display
    if (!postData) {
      res.status(404).json({ message: "No Post found with this id" });
      return;
    }

    // Seialize post data
    const post = postData.get({ plain: true });

    // Render post page template
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


// Dashboard page route
router.get("/dashboard", async (req, res) => {
  if (req.session.logged_in) {  // Only route to the dashboard if user is logged in
    try {
      // Retrieve all posts by logged in user, order by createdOn date descending
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

    // Serialize individual posts
      const posts = postData.map((post) => post.get({ plain: true }));

    // Render dashboard page template
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

  res.redirect("/login"); // Route to the login page if user is not logged in
});


// Login page route
router.get("/login", async (req, res) => {
  if (req.session.logged_in) {  // If user is logged in, forward them to dashboard page
    res.redirect("/dashboard");
    return;
  }

  res.render("login");  // If user is not logged in, render login page template
});

module.exports = router;
