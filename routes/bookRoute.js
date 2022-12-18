const express = require("express")
const router = express.Router()
const { getAllBooks, getSingleBook, createBook, updateBook, deleteBook } = require("../controllers/bookController")
const { authenticationMiddleware, authorizeMiddleware } = require("../middlewares/authentication")


router
    .route("/")
    .get(getAllBooks)
    .post([authenticationMiddleware, authorizeMiddleware("admin")], createBook)

router
    .route("/:id")
    .get(getSingleBook)
    .patch([authenticationMiddleware, authorizeMiddleware("admin")], updateBook)
    .delete([authenticationMiddleware, authorizeMiddleware("admin")], deleteBook)

module.exports = router