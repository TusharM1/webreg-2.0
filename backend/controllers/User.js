const { User } = require("../models");
//This async method queries the database to check that a user exists based on the username and passsword passed in by a user in the login page.
const getUserFromCredentials = async (netID, password) => {
	const user = (await User.findByPk(netID));

	if (user) {
		const userData = user.get();
		if (!userData.isActive) {
			return {
				error: true,
				message: "Deactivated User"
			};
		}
		if (userData.password === password)
			return formattedUser(userData);
	}

	return {
		error: true,
		message: "Incorrect credentials"
	};
};
//This async method fetches a particular user's info based on their token id.
const getUserFromToken = async (token) => {
	const user = (await User.findOne({
		where: {
			token: token
		}
	}));

	if (user) {
		const userData = user.get();
		if (!userData.isActive) {
			return {
				error: true,
				message: "Deactivated User"
			};
		}
		return formattedUser(userData);
	}

	return {
		error: true,
		message: "Incorrect credentials"
	};
};
//This function formats user information into 4 parameters that uniquely identify a user.
function formattedUser(user) {
	return {
		netID: user.netID,
		fullName: user.fullName,
		token: user.token,
		role: user.role
	};
}

module.exports = { getUserFromCredentials, getUserFromToken };