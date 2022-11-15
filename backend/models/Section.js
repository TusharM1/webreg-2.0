module.exports = (sequelize, DataTypes) => {
	return sequelize.define("Section", {
		sectionIndex: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		courseString: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: "Course",
				key: "courseString"
			}
		},
		sectionNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sectionType: {
			type: DataTypes.STRING,
			allowNull: false
		},
		professor: {
			type: DataTypes.STRING,
			allowNull: false
		},
		capacity: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		comments: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});
};