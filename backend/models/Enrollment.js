//This table represents all student course enrollments.
module.exports = (sequelize, DataTypes) => {
	const Enrollment = sequelize.define("Enrollment", {
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
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});

	Enrollment.associate = function (models) {
		Enrollment.belongsTo(models.Semester, {foreignKey: 'semesterName'});
	}

	return Enrollment;
};