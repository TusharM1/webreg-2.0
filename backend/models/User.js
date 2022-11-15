module.exports = (sequelize, DataTypes) => {
	return sequelize.define("User", {
		netID: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		fullName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		token: {
			type: DataTypes.STRING,
			allowNull: false
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false
		},
		isActive: {
			type: DataTypes.TINYINT,
			allowNull: false
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});
};