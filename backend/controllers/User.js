const { User } = require('../models')

const getUserFromCredentials = async (netID, password) => {
    const user = (await User.findByPk(netID)).get();
    if (user) {
        if (!user.isActive) {
            return {
                error: true,
                message: "Deactivated User"
            }
        }
        if (user.password === password)
            return formattedUser(user);
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
    })).get();
    if (user) {
        if (!user.isActive) {
            return {
                error: true,
                message: "Deactivated User"
            }
        }
        return formattedUser(user);
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

module.exports = {getUserFromCredentials, getUserFromToken}