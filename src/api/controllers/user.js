const { User } = require('../models')
const { asyncErrorHandler, CustomError} = require('../helpers')

const signup = asyncErrorHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new CustomError('Invalid Credentials', 400)
    }

    const user = new User({ username, email, password })
    await user.save()

    const token = await user.generateToken()
    res.status(201).json({ user, token })
})

const login = asyncErrorHandler(async (req, res) => {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    
    const token = await user.generateToken()
    await user.populate('projects')
    res.status(200).json({ projects: user.projects, token })
})

const getUser = asyncErrorHandler(async (req, res) => {
    res.status(200).json({ user: req.user })
})

const logout = asyncErrorHandler(async (req, res) => {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token !== req.token
    })
    await req.user.save()
    res.status(200).json({ msg: "logged out" })
})

const logoutAll = asyncErrorHandler(async (req, res) => {
    req.user.tokens = []
    await req.user.save()
    res.status(200).json({ msg: "logged out everywhere" })
})


module.exports = {
    login,
    signup,
    getUser,
    logout,
    logoutAll
}