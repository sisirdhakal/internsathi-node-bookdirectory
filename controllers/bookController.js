const Book = require("../models/BookModel")
const CustomError = require("../errors")
const { checkPermissions } = require("../utils")
const { StatusCodes } = require("http-status-codes")


const getAllBooks = async (req, res, next) => {

    const books = await Book.find({})

    res.status(StatusCodes.OK).json({ count: books.length, books })

}

const getSingleBook = async (req, res, next) => {

    const { id: bookId } = req.params

    if (!bookId) {
        throw new CustomError.BadRequestError("Please provide a job id")
    }

    const book = await Book.findOne({ _id: bookId })

    if (!book) {
        throw new CustomError.NotFoundError(`Book of id ${bookId} not found`)
    }

    res.status(StatusCodes.OK).json({ book })

}

const createBook = async (req, res, next) => {

    const book = await Book.create(req.body)

    res.status(StatusCodes.CREATED).json({ msg: "created", book })

}

const updateBook = async (req, res, next) => {

    const { name } = req.body
    const { id: bookId } = req.params


    const book = await Book.findOne({ _id: bookId })

    checkPermissions(req.user, book.createdBy)

    book.name = name;

    await book.save()

    res.status(StatusCodes.OK).json({ book, msg: "successfully updated" })


}

const deleteBook = async (req, res, next) => {

    const { id: bookId } = req.params

    const book = await Book.findOne({ _id: bookId })

    checkPermissions(req.user, book.createdBy)

    await book.remove()

    res.status(StatusCodes.OK).json({ msg: "Job deleted sucessfully !!" })

}

module.exports = {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook,
}