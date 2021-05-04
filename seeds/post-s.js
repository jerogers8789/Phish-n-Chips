const {Post} = require('../models');

const postData = [{
    title:'Phish',
    content:'phishy stuff',
    user_id: 1
},{
    title:'N',
    content:'and',
    user_id: 2
},{
    title:'Chips',
    content:'Chippy stuff',
    user_id: 3
}];
const seedPost = () => Post.bulkCreate(postData);
module.exports = seedPost;