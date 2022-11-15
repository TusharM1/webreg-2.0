module.exports = (sequelize, DataTypes) => {
	return sequelize.define("Semester", {
		semesterName: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		season: {
			type: DataTypes.STRING,
			allowNull: false
		},
		year: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		startDate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		endDate: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});
};