module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Department", {
        departmentNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        departmentName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}