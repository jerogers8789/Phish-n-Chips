const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
class User extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
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
            len:[5]
        }
    }
}, {
    hooks: {
        async beforeBuild(newUserData) {
            newUserData.pw = await bcrypt.hash(newUserData.pw, 10);
            return newUserData;
        },
        async beforeUpdate(updateUserData) {
            updateUserData.pw = await bcrypt.hash(updateUserData.pw, 10);
            return updateUserData;
        }
    }
}, {
    sequelize,
    timestamp: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});
module.exports = User;