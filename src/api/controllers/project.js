const mongoose = require('mongoose')
const loadAgenda = require('../../db/agenda')
const { Project, Question, Session } = require('../models')
const { asyncErrorHandler, CustomError, resumeJob} = require('../helpers')

const makeProject = asyncErrorHandler(async (req, res) => {
    const existing_project = await Project.findOne({ owner: req.user._id, addiction: req.body.addiction })

    if (existing_project) {
        throw new CustomError('Already on this project', 400)
    }

    const questions = await Question.find({ addiction: req.body.addiction })

    const options = questions.map((question) => {
        return {
            qid: question._id,
        }
    })


    const project = new Project({
        owner: req.user._id,
        addiction: req.body.addiction,
        options: [...options]
    })

    await project.save()
    res.status(201).send({ project })
})


const getProjects = asyncErrorHandler(async (req, res) => {
    const projects = await Project.find({ owner: req.user._id })
    res.status(200).send({ projects })
})

const getProject = asyncErrorHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if (!project) {
        throw new CustomError('Project not found', 404)
    }

    await project.populate('sessions')
    res.status(200).send({ project })
})

const quitProject = asyncErrorHandler(async (req, res) => {
    const agenda = await loadAgenda()

    await new Promise((resolve) => agenda.once('ready', resolve))

    const projects = await Project.find({ owner: req.user._id })

    const project = projects.find((pro) => {
        return pro._id.toString() === req.params.id
    })
    if (!project) {
        throw new CustomError('Project not found', 404)
    }

    await agenda.cancel({ name: `project_${req.params.id}` })
    await Project.deleteOne({ _id: project._id });

    res.status(200).send({ msg: "deleted successfully" })
})

const resumeProject = asyncErrorHandler(async (req, res) => {
    const agenda = await loadAgenda()
    agenda.start()
    await new Promise((resolve) => agenda.once('ready', resolve))

    const jobs = await agenda.jobs()
    if(jobs.length === 0){
        return res.status(200).send({msg : "No jobs present"})
    }

    for (const job of jobs) {
        const name = job.attrs.name
        const time = job.attrs.repeatInterval

        await job.remove({name : `${job.attrs.name}`})

        agenda.define(name, async () => {
            const id = new mongoose.Types.ObjectId(name.split('_')[1])
            const sessions = await Session.find({ project: id })
            const object = {
                project: id,
            }

            object.session = sessions.length === 0 ? sessions.length + 1 : sessions[sessions.length - 1].session + 1

            const session = new Session(object)
            await session.save();
        })

        agenda.processEvery("1 minute")
        agenda.every(time, `${name}`)

    }
    res.status(200).send({msg : "Successfully restarted"});
})

module.exports = { makeProject, getProjects, getProject, quitProject, resumeProject }