//This table represents all schools at Rutgers.
module.exports = (sequelize, DataTypes) => {
	return sequelize.define("School", {
		schoolNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		schoolName: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});
};