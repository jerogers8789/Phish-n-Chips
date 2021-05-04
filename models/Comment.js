const sequelize = require('../config/connection');
const {Model, DataTypes} = require('sequelize');
class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    post_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'post',
            key: 'id'
        }
    },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key:'id'
            }
    },
    comment_txt: {
        type: DataTypes.STRING,
        validate: {
            len:[5]
        }
    }
    
}, { sequelize,
freezeTableName: true,
underscored: true,
modelName: 'comment'
});
module.exports = Comment;