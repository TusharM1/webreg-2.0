module.exports = (sequelize, DataTypes) => {
	return sequelize.define("StudyProgram", {
		studyProgramCode: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});
};