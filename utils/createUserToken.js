const createUserToken = (user) => {

    return { name: user.username, userId: user._id }

}

module.exports = createUserToken