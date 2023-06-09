// Users data
const users = [
  {
    id: 1,
    name: "Super User",
    email: "superuser@email.com",
    password: "password123",
  },
  {
    id: 2,
    name: "John",
    email: "john@email.com",
    password: "password123",
  },
  {
    id: 3,
    name: "Mary",
    email: "mary@email.com",
    password: "password123",
  },
];

// Posts data
const posts = [
  {
    title: "My first post!",
    content: "Excited to be here!!",
    createdOn: "1/1/2022",
    userId: 1,
  },
  {
    title: "This is ChatGPT",
    content: "Just kidding",
    createdOn: "10/15/2022",
    userId: 2,
  },
  {
    title: "Am I doing this right?",
    content: "This is easy to use",
    createdOn: "4/3/2023",
    userId: 3,
  },
  {
    title: "Site down for maintenance",
    content: "Sorry :/",
    createdOn: "5/1/2023",
    userId: 1,
  },
];

// Comments data
const comments = [
  {
    content: "Funny!",
    createdOn: "10/15/2022",
    postId: 2,
    userId: 1,
  },
  {
    content: "Welcome to the site!",
    createdOn: "4/4/2023",
    postId: 3,
    userId: 1,
  },
  {
    content: "Bummer :(",
    createdOn: "5/1/2023",
    postId: 4,
    userId: 3,
  },
  {
    content: "Can this wait?",
    createdOn: "5/1/2023",
    postId: 4,
    userId: 2,
  },
];

// Import models and DB connection
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");

async function seedData() {
  try {
    await sequelize.sync({ force: true });  // Connect to DB and initialize schema

    await User.bulkCreate(users, {
        individualHooks: true // Create users in bulk, apply hooks individually
    });

    await Post.bulkCreate(posts); // Create posts in bulk

    await Comment.bulkCreate(comments); // Create comments in bulk

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seedData();