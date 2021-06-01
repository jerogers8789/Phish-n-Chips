const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.pw);
    }
}
User.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }, username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, pw: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[8]
        }
    }
}, {
    hooks: {
         beforeCreate: async (newUserData) => {
            newUserData.pw = await bcrypt.hash(newUserData.pw, 10);
            return newUserData;
        },
        beforeUpdate: async (updateUserData) => {
            updateUserData.pw = await bcrypt.hash(updateUserData.pw, 10);
            return updateUserData;
        }
},
    sequelize,
    timestamp: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});
module.exports = User;