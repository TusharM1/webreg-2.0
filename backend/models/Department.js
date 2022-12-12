module.exports = (sequelize, DataTypes) => {
	const Department =  sequelize.define("Department", {
		departmentNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		departmentName: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});

	Department.associate = function (models) {
		Department.hasOne(models.SchoolDepartment, {foreignKey: 'departmentNumber'});
	}

	return Department;
};