module.exports = (sequelize, DataTypes) => {
    return sequelize.define('PostHashtag', {

    }, {
        freezeTableName: true,
        timestamps: true
    })
}