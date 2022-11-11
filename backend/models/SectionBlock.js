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
            allowNull: true,
            primaryKey: true
        },
        blockStart: {
            type: DataTypes.TIME,
            allowNull: true,
            primaryKey: true
        },
        blockEnd: {
            type: DataTypes.TIME,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
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