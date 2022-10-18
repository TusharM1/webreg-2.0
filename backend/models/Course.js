module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Course", {
        courseString: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        schoolNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "School",
                key: "schoolNumber"
            }
        },
        departmentNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "Department",
                key: "departmentNumber"
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numberOfCredits: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        prerequisites: {
            type: DataTypes.STRING(1024),
            allowNull: false
        },
        isActive: {
            type: DataTypes.TINYINT,
            allowNull: false,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}