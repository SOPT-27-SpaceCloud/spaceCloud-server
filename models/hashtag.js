const { Post, PostDetail } = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Hashtag', {
        PostId: {
            type: DataTypes.INTEGER,
            reference: {
                model: Post,
                key: 'id',
            }
        },
        PostDetailId: {
            type: DataTypes.INTEGER,
            reference: {
                model: PostDetail,
                key: 'id',
            }
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    })
}