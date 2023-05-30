// Import models to add associations to
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Post belongs to User
Post.belongsTo(User);

// User has many Posts
User.hasMany(Post);

// Post has many Comments
Post.hasMany(Comment, {
    // When a post is deleted, delete all comments associated with it
    //  so there aren't any orphaned comments in the db
    onDelete: 'CASCADE',
});

// Comment belongs to Post
Comment.belongsTo(Post);

// Comment belongs to User
Comment.belongsTo(User);

// User has many Comments
User.hasMany(Comment);


module.exports = {
    User,
    Post,
    Comment
}