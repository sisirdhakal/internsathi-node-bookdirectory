const Book = require("../models/BookModel")
const CustomError = require("../errors")
const { StatusCodes } = require("http-status-codes")


const getAllBooks = async (req, res, next) => {

    const { textValue, author, category } = req.query

    let toFind = {}

    if (textValue) {
        toFind.name = { $regex: textValue, $options: 'i' }
    }
    if (author) {

        toFind.author = author
    }
    if (category) {
        toFind.category = category
    }

    let result = Book.find(toFind)

    const books = await result

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

    // const { name, author, publishedBy, price, category } = req.body
    const { id: bookId } = req.params


    const book = await Book.findOneAndUpdate({ _id: bookId }, req.body, { new: true, runValidators: true })

    /**
     * this is the another way for updating
     */

    // book.name = name;
    // book.author = author;
    // book.publishedBy = publishedBy;
    // book.price = price;
    // book.category = category

    // await book.save()

    res.status(StatusCodes.OK).json({ book, msg: "successfully updated" })


}

const deleteBook = async (req, res, next) => {

    const { id: bookId } = req.params

    const book = await Book.findOne({ _id: bookId })

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