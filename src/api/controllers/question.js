const { Question } = require('../models')
const { asyncErrorHandler } = require('../helpers')
const {CustomError} = require('../helpers')

const enterQuestion = asyncErrorHandler(async (req, res) => {
    const { question, addiction, options } = req.body
    
    const existing = await Question.findOne({ question })
    if (existing) {
        throw new CustomError('Question already exists')
    }

    const q = new Question({
        addiction,
        question,
        options
    })

    await q.save()
    res.status(201).send({ question: q })
})

const getQuestions = asyncErrorHandler(async (req, res) => {
    const {addiction} = req.params
    const questions = await Question.find({addiction})
    res.status(200).send({ questions })
})

module.exports = { enterQuestion, getQuestions }