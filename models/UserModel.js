const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    username: {
        type: "string",
        required: [true, "Please provide the username"],
        minlength: 3
    },
    email: {
        type: "string",
        required: [true, "Please provide the email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email address"],
        unique: true
    },
    password: {
        type: "string",
        required: [true, "Please provide the password"],
        match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must contain minimum 6 character with atleast one number and one string"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
})

UserSchema.pre("save", async function () {

    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt)

})

UserSchema.methods.comparePassword = function (userPassword) {
    return bcrypt.compare(userPassword, this.password)
}

module.exports = mongoose.model("User", UserSchema)