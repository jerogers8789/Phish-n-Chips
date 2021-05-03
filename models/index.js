const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

User.hasMany(Post, {
    foreignKey: 'user_id'
});
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete:'cascade'
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});
module.exports = {User, Post, Comment};