const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
    project : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Project'
    },
    session : {
        type : Number,
        required : true,
    },
    answers : [{
        qid: {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Question',
        },
        option_chosen : Number,
        wtp : Number,
    }],
    session_score : {
        type : Number,
        default : 0
    }
},{
    strict : true,
    versionKey : false,
    timestamps : true
}) 

const Session = mongoose.model('Session', SessionSchema)

module.exports = Session