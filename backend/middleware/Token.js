const { User } = require("../models");

async function tokenMiddleware(req, res, next) {
    if (req.body) {
        const { token } = req.body;
        if (token) {
            const user = (await User.findOne( {
                where: {
                    token: token
                }
            }));
            if (user) {
                next();
                return;
            }
        }
    }
    res.json({
        error: true,
        message: "Missing or Invalid Token"
    });
}

module.exports = tokenMiddleware;