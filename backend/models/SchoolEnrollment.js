//This table represents all students at Rutgers and their respective school(s).
module.exports = (sequelize, DataTypes) => {
	return sequelize.define("SchoolEnrollment", {
		netID: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			references: {
				model: "User",
				key: "netID"
			}
		},
		schoolNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: "School",
				key: "schoolNumber"
			}
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});
};