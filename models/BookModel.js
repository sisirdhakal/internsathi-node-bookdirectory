const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the book name"],
        minlength: 3
    },
    author: {
        type: String,
        required: [true, "Please provide the author name"],
        minlength: 3
    },
    publishedBy: {
        type: String,
        required: [true, "Please provide the publication name"],
        minlength: 3
    },
    // publishedDate: {
    //     type: Date,
    //     required: [true, "please provide published date"]
    // },
    category: {
        type: String,
        required: [true, "Please provide the category name"],
        minlength: 3
    },
    price: {
        type: Number,
        required: [true, "Please provide the book price"],
        default: 0
    }

})

module.exports = mongoose.model("Book", BookSchema)