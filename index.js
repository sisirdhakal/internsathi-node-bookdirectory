require("dotenv").config()
require("express-async-errors")

const express = require("express")
const app = express()
const morgon = require("morgan")
const cookieParser = require("cookie-parser")


/**
 * import database and security
 */

const connectDB = require("./db/connectDB")
const xssClean = require("xss-clean")
const helmet = require("helmet")
const cors = require("cors")
const mongoSanitize = require("express-mongo-sanitize")

// ports
const port = process.env.PORT || 3000

/**
 *  import middlewares
 */

const AuthRouter = require("./routes/authRoute")
const customError = require("./middlewares/customerror")
const notFound = require("./middlewares/notfound")
const authenticationMiddleware = require("./middlewares/authentication")

/**
 * security
 */

app.use(helmet())
app.use(xssClean())
app.use(cors())
app.use(mongoSanitize())


/**
 * middlware
 */
app.use(morgon("tiny"))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))




/**
 * routes middlwares
 */

app.use("/api/v1/auth/", AuthRouter)


app.use(notFound)
app.use(customError)



/**
 * application
 */


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL).then(() => {
            console.log("connected to database successfully")
        })
        app.listen(port, () => {
            console.log(`App is running on port ${port}`)
        })

    } catch (error) {
        console.log(error)
    }
}
start();