
const {Comment} = require('../models');
const commentData = [{
    comment_txt:'I',
    user_id: 1,
    post_id: 1
},{
    comment_txt:'need an',
    user_id: 2,
    post_id: 2
},{
    comment_txt:'A, please',
    user_id: 3,
    post_id: 3
}];
const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;