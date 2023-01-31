const userService = require('../services/userService')

const signUp = async (req, res) => {
    const { name, password, email, profileImage } = req.body

    await userService.signUp(name, password, email, profileImage)
    return res.status(201).json({ message: 'SIGNUP_SUCCESS' })
}


module.exports = {
    signUp
}