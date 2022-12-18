const jwt = require("jsonwebtoken")

const getToken = ({ payload }) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_LIFE })
}

const verifyToken = token => {

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    return payload

}

const attachCookieToResponse = ({ res, payload }) => {

    const token = getToken({ payload })

    const oneDay = 1000 * 60 * 60 * 24

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production"

    })

}

module.exports = {
    getToken,
    verifyToken,
    attachCookieToResponse
}