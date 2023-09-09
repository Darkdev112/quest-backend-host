const express =require('express')
const {userController} = require('../controllers')
const {auth} = require('../middlewares')

const router = express.Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/getuser',auth, userController.getUser)
router.delete('/logout',auth, userController.logout)
router.delete('/logouts',auth, userController.logoutAll)

module.exports = router