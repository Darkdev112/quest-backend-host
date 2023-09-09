const express =require('express')
const {projectController} = require('../controllers')
const {auth} = require('../middlewares')

const router = express.Router()

router.post('/makeproject',auth, projectController.makeProject)
router.get('/getprojects', auth, projectController.getProjects)
router.get('/getproject/:id', auth, projectController.getProject)
router.delete('/quitproject/:id', auth, projectController.quitProject)
router.patch('/resumeproject',projectController.resumeProject)

module.exports = router