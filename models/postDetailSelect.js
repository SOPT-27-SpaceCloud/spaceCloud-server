module.exports = (sequelize, DataTypes) => {
    return sequelize.define('PostDetailSelect', {
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        contents: {
            type: DataTypes.TEXT(),
            allowNull: false,
        },
        reservationTime: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        capacity: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
};