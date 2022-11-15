module.exports = (sequelize, DataTypes) => {
	return sequelize.define("CoreRequirement", {
		courseString: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			references: {
				model: "Course",
				key: "courseString"
			}
		},
		coreCode: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		coreCategory: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});
};