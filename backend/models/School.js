module.exports = (sequelize, DataTypes) => {
    return sequelize.define("School", {
        schoolNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        schoolName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        createdAt: false,
        updatedAt: false
    });
}