const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    addiction : {
        type : String,
        required : true,
    },
    options : [{
        qid : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'Question'
        },
        pop : {
            type : [Number],
            default : [0,0,0,0,0]
        }
    }]
},{
    strict : true,
    versionKey : false,
    timestamps : true,
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    },
    id : false
})

ProjectSchema.virtual('sessions',{
    ref : 'Session',
    localField : '_id',
    foreignField : 'project'
})

const Project = mongoose.model('Project', ProjectSchema)
module.exports = Project