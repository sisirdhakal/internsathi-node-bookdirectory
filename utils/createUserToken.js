const createUserToken = (user) => {

    return { name: user.username, userId: user._id, role: user.role }

}

module.exports = createUserToken