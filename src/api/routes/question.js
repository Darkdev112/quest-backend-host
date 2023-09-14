const express =require('express')
const {questionController} = require('../controllers')
const {auth} = require('../middlewares')

const router = express.Router()

router.post('/enterquestion',auth, questionController.enterQuestion)
router.get('/getquestions/:addiction',auth, questionController.getQuestions)

module.exports = router