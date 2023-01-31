const userDao = require('../models/userDao')

const signUp = async (name, password, email, profileImage) => {

    const createUser = await userDao.createUser(
        name,
        password,
        email,
        profileImage
    )

    return createUser
}


module.exports = {
    signUp
}