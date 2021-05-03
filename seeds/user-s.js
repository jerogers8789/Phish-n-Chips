const {User} = require('../models');
const userData = [{
    username: 'Bill',
    pw: 'ted'
},{
    username:'Excellent',
    pw:'adventure'
},{
    username: 'MasterChief',
    pw:'Sierra-117'
}];
const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;