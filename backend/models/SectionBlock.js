module.exports = (sequelize, DataTypes) => {
    return sequelize.define("SectionBlock", {
        sectionIndex: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "Section",
                key: "sectionIndex"
            }
        },
        blockDay: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        blockStart: {
            type: DataTypes.TIME,
            allowNull: false,
            primaryKey: true
        },
        blockEnd: {
            type: DataTypes.TIME,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        meetingType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}