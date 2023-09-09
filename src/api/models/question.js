const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    addiction : {
        type : String,
        required : true
    },
    question : {
        type : String,
        unique : true,
        required : true
    },
    options : [{
        type : String
    }]
},{
    strict : true,
    versionKey : false,
    timestamps : true
}) 

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question