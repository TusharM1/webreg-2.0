//This table represents all requirements for all degree study programs at Rutgers.
module.exports = (sequelize, DataTypes) => {
	return sequelize.define("StudyProgramRequirement", {
		studyProgramCode: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			references: {
				model: "StudyProgram",
				key: "studyProgramCode"
			}
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		requirement: {
			type: DataTypes.STRING(1024),
			allowNull: false
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});
};