module.exports = (sequelize, DataTypes) => {
    return sequelize.define('PostDetailImage', {
        postImageUrl: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
};