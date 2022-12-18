const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")
const User = require("../models/UserModel")
const { attachCookieToResponse, createUserToken } = require("../utils")


const login = async (req, res, next) => {

    try {

        const { email, password } = req.body

        if (!email) {
            throw new CustomError.BadRequestError("Please provide email")
        }
        if (!password) {
            throw new CustomError.BadRequestError("Please provide password")
        }

        const user = await User.findOne({ email })

        if (!user) {
            throw new CustomError.NotFoundError("Wrong email address !! Please try again")
        }

        const isMatched = await user.comparePassword(password)

        if (!isMatched) {
            throw new CustomError.UnauthenticatedError("Wrong password !! Please try again")
        }

        const payload = createUserToken(user)
        attachCookieToResponse({ res, payload })

        res.status(StatusCodes.OK).json({ msg: "login successful", payload })

    } catch (error) {
        next(error)
    }

}

const register = async (req, res, next) => {

    try {

        const { username, email, password } = req.body

        const user = await User.create({ username, email, password })

        const payload = createUserToken(user)

        attachCookieToResponse({ res, payload })

        res.status(StatusCodes.CREATED).json({ msg: "success", payload })
    } catch (error) {
        next(error)
    }


}

const logout = async (req, res) => {

}

const showMe = async (req, res) => {

}

module.exports = {
    login,
    register,
    logout,
    showMe
}