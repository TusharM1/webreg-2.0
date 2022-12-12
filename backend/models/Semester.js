module.exports = (sequelize, DataTypes) => {
	const Semester = sequelize.define("Semester", {
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

	Semester.associate = function (models) {
		Semester.hasOne(models.Enrollment, { foreignKey: "semesterName" });
	};

	return Semester;
};