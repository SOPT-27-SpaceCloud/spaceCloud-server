const { Post, PostDetail } = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Hashtag', {
        tag: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
}