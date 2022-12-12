module.exports = (sequelize, DataTypes) => {
	const SchoolDepartment = sequelize.define("SchoolDepartment", {
		schoolNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			references: {
				model: "School",
				key: "schoolNumber"
			}
		},
		departmentNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			references: {
				model: "Department",
				key: "departmentNumber"
			}
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});

	SchoolDepartment.associate = function (models) {
		SchoolDepartment.belongsTo(models.Department, { foreignKey: "departmentNumber" });
	};

	return SchoolDepartment;
};