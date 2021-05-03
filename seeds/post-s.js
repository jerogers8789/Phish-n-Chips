const {Post} = require('../models');

const postData = [{
    post_title:'Phish',
    post_body:'phishy stuff',
    user_id: 1
},{
    post_title:'N',
    post_body:'and',
    user_id: 2
},{
    post_title:'Chips',
    post_body:'Chippy stuff',
    user_id: 3
}];
const seedPost = () => Post.bulkCreate(postData);
module.exports = seedPost;