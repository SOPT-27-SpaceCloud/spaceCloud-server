module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Facilities', {
        iconImageUrl: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        contents: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
};