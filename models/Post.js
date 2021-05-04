const sequelize = require('../config/connection');
const {Model, DataTypes} = require('sequelize');
class Post extends Model {}
Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }, user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }, title: {
        type: DataTypes.STRING,
        allowNull: false
    }, content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
});
module.exports = Post;