const { UnauthorizedError } = require("../errors")
const { verifyToken } = require("../utils")


const authenticationMiddleware = async (req, res, next) => {

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

        if (!token) {
            throw new BadRequestError("Please provide a token")
        }

        const payload = verifyToken(token)

        if (!payload) {
            throw new UnauthorizedError("Please provide valid token")
        }

        req.user = { name: payload.username, userId: payload.userId, role: payload.role }
        next()

    } catch (error) {
        next(error)
    }

}

/**
 * for checking the authorization
 */

const authorizeMiddleware = (...value) => {
    return (req, res, next) => {
        if (!value.includes(req.user.role)) {
            throw new UnauthorizedError("Unauthorized to access this route")
        }
        next()
    }
}

module.exports = {
    authenticationMiddleware,
    authorizeMiddleware
}