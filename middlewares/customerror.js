const { StatusCodes } = require("http-status-codes")


const customError = async (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong ,Please try again"
    }

    if (err.code && err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST,
            customError.message = `Duplicate Email, ${Object.keys(err.keyValue)} already exists`
    }

    if (err.name === "ValidationError") {
        customError.statusCode = StatusCodes.BAD_REQUEST,
            customError.message = Object.values(err.errors).map(item => item.message).join(",")
    }

    if (err.name === "CastError") {
        customError.statusCode = StatusCodes.NOT_FOUND,
            customError.message = `Task of id ${err.value} cannot be found`
    }

    return res.status(customError.statusCode).json({ msg: customError.message })

}

module.exports = customError