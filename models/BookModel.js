const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: [true, "Please provide the book name"],
        minlength: 3
    },
    Author: {
        type: "string",
        required: [true, "Please provide the author name"],
        minlength: 3
    },
    Publication: {
        type: "string",
        required: [true, "Please provide the publication name"],
        minlength: 3
    },
    PublishedDate: {

    },
    Category: {
        type: "string",
        required: [true, "Please provide the category name"],
        minlength: 3
    },
    Price: {

    },

})

module.exports = mongoose.model("Book", BookSchema)