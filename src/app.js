const express = require('express')
const cors = require('cors')
const config = require('./config/config')
const morgan = require("./config/morgan");
const {userRoute, projectRoute, sessionRoute, questionRoute} = require('./api/routes')
const {globalErrorHandler} = require('./api/middlewares')
const {CustomError} = require('./api/helpers')

const appLoader = async(app) => {
    app.get('/',(req,res) => {
        res.status(200).end()
    })
    app.head('/',(req,res) => {
        res.status(200).end()
    })

    if(config.mode !== "test"){
        app.use(morgan.successHandler);
        app.use(morgan.errorHandler);
    }
    
    app.use(express.json())
    app.use(cors({
        origin : config.client_url
    }))
    app.use(express.urlencoded({ extended: true }));
    
    app.use(userRoute)
    app.use(projectRoute)
    app.use(sessionRoute)
    app.use(questionRoute)
    
    app.use(globalErrorHandler)
}

module.exports = appLoader