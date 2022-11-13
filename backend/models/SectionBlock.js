module.exports = (sequelize, DataTypes) => {
    return sequelize.define("SectionBlock", {
        id:{ //can't figure out a way to do this without having this id
            type: DataTypes.STRING,
            primaryKey: true
        },
        sectionIndex: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "Section",
                key: "sectionIndex"
            }
        },
        blockDay: {
            type: DataTypes.STRING,
            allowNull: true
        },
        blockStart: {
            type: DataTypes.TIME,
            allowNull: true,
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