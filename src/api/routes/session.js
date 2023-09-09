const express =require('express')
const {sessionController} = require('../controllers')
const {auth} = require('../middlewares')

const router = express.Router()

router.post('/startsessions/:id',auth, sessionController.startSessions)
router.patch('/updatesession/:id',auth, sessionController.updateSession)
router.patch('/calculatesession/:id',auth, sessionController.calculateSession)
router.get('/sessionscore/:id',auth, sessionController.sessionScore)
router.get('/getsessions/:id',auth, sessionController.getSessions)

module.exports = router