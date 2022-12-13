//This table represents course information for transfer students, transferring credits from other Universities. 
module.exports = (sequelize, DataTypes) => {
	return sequelize.define("TransferCredit", {
		courseString: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			references: {
				model: "Course",
				key: "courseString"
			}
		},
		netID: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			references: {
				model: "User",
				key: "netID"
			}
		},
		origin: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});
};