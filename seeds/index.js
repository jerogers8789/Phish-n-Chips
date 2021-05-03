const sequelize = require('../config/connection');
const seedUser = require('./user-s');
const seedPost = require('./post-s');
const seedComment = require('./comment-s');

const seedAll = async () => {
    await sequelize.sync({force: true});
    await seedUser();
    await seedPost();
    await seedComment();
    process.exit(0);
};
seedAll();