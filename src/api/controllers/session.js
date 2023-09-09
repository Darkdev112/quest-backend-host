const mongoose = require('mongoose')
const loadAgenda = require('../../db/agenda')
const { Session, Project } = require('../models')
const { asyncErrorHandler, CustomError } = require('../helpers')

const startSessions = asyncErrorHandler(async (req, res) => {
    const agenda = await loadAgenda();

    const project = await Project.findById(req.params.id)
    if(!project){
        throw new CustomError('Project not found', 404)
    }

    await project.populate('sessions')
    if(project.sessions.length !== 0){
        throw new CustomError('Project not found', 404)
    } 

    agenda.define(`project_${req.params.id}`,async (job) => {
        const id = new mongoose.Types.ObjectId(job.attrs.name.split('_')[1])
        const sessions = await Session.find({ project: id })
        const object = {
            project : id,
        }

        object.session = sessions.length === 0 ? sessions.length + 1 : sessions[sessions.length - 1].session + 1 

        const session = new Session(object)
        await session.save();
    })

    await new Promise((resolve) => agenda.once('ready', resolve))

    agenda.processEvery('1 minute')
    agenda.start();
    agenda.every(req.body.time, `project_${req.params.id}`)

    res.status(201).json({ project })
})


const updateSession = asyncErrorHandler(async (req, res) => {
    const { answers } = req.body;
    const id = new mongoose.Types.ObjectId(req.params.id)
    const session = await Session.findOne({ project: id, session: req.query.session });
    const project = await Project.findById(req.params.id)
    
    if (!session) {
        throw new CustomError('Session not found',404)
    }
    if (session.answers.length !== 0) {
        throw new CustomError('Duplicate Found',400)
    }

    const answers_mapped = answers.map((answer) => {
        const option_index = project.options.findIndex((option) => {
            return option.qid.toString() === answer.qid
        })
        project.options[option_index].pop[answer.option_chosen - 1] += 1;
        return {
            qid: new mongoose.Types.ObjectId(answer.qid),
            option_chosen: answer.option_chosen
        }
    })
    session.answers = [...answers_mapped]

    await session.save();
    await project.save();
    res.status(200).json({ project, session })
})

const calculateSession = asyncErrorHandler(async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const project = await Project.findById(req.params.id)
    const session = await Session.findOne({ project: id, session: req.query.session });

    if (!session) {
        throw new CustomError('Session not found',404)
    }

    session.answers.forEach((answer) => {
        const option = project.options.find((opt) => {
            return opt.qid.equals(answer.qid)
        })
        answer.wtp = (option.pop[answer.option_chosen - 1] / session.session) * (answer.option_chosen / option.pop.length)
        session.session_score += answer.wtp
    })
    session.session_score /= session.answers.length

    await session.save()
    res.status(200).send({ session, project })
})

const sessionScore = asyncErrorHandler(async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const session = await Session.findOne({ project: id, session: req.query.session });
    res.status(200).send({ score: session.session_score })
})

const getSessions = asyncErrorHandler(async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const sessions = await Session.find({ project: id })
    res.status(200).send({ sessions })
})

module.exports = {
    startSessions,
    updateSession,
    calculateSession,
    getSessions,
    sessionScore
}