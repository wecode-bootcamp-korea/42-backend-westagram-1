const userDao = require('../models/userDao')

const createUser = async (name, password, email, profileImage) => {

    const createUserResult = await userDao.createUser(
        name,
        password,
        email,
        profileImage
    )

    return createUserResult
}


module.exports = {
    createUser
}