const { User } = require('../models')

const getUserFromCredentials = async (netID, password) => {
    const user = (await User.findByPk(netID));
    if (user) {
        const userData = user.get();
        if (!userData.isActive) {
            return {
                error: true,
                message: "Deactivated User"
            }
        }
        if (userData.password === password)
            return formattedUser(userData);
    }
    return {
        error: true,
        message: "Incorrect credentials"
    }
}

const getUserFromToken = async (token) => {
    const user = (await User.findOne( {
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
            }
        }
        return formattedUser(userData);
    }
    return {
        error: true,
        message: "Incorrect credentials"
    }
}

function formattedUser(user) {
    return {
        netID: user.netID,
        fullName: user.fullName,
        token: user.token,
        role: user.role
    };
}

module.exports = { getUserFromCredentials, getUserFromToken }