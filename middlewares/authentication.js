const { UnauthorizedError } = require("../errors")
const { verifyToken } = require("../utils")


const authenticationMiddleware = async (res, req, next) => {

    try {

        let token

        const authHeader = req.headers.authorization

        if (req.cookies) {
            token = req.cookies.token
        }
        else if (req.signedCookies) {
            token = req.signedCookies.token
        }
        else if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1]
        }

        const payload = verifyToken(token)

        if (!payload) {
            throw new UnauthorizedError("Please provide valid token")
        }

        req.user = { name: payload.username, userId: payload.userId }

    } catch (error) {
        next(error)
    }

}

module.exports = authenticationMiddleware