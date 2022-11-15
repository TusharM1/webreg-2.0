module.exports = (sequelize, DataTypes) => {
	return sequelize.define("StudyProgramStudent", {
		netID: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			references: {
				model: "User",
				key: "netID"
			}
		},
		studyProgramCode: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			references: {
				model: "StudyProgram",
				key: "studyProgramCode"
			}
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});
};