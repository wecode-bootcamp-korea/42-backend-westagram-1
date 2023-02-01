const userService = require('../services/userService')

const createUser = async (req, res) => {
    const { name, password, email, profileImage } = req.body

    await userService.createUser(name, password, email, profileImage)
    return res.status(201).json({ message: 'SIGNUP_SUCCESS' })
}


module.exports = {
    createUser
}