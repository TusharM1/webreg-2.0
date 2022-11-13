module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Enrollment", {
        netID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "User",
                key: "netID"
            }
        },
        semesterName: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "Semester",
                key: "semesterName"
            }
        },
        courseString: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "Course",
                key: "courseString"
            }
        },
        sectionIndex: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "Section",
                key: "sectionIndex"
            }
        },
        grade: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });
}