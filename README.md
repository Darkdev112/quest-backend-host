## Routes
Signup with new user (POST) : https://breakingfree.onrender.com/signup , {body :{username, email, password}}

Login with existing user (POST) : https://breakingfree.onrender.com/login , {body : {email,password}}

Fetch user details (authorised)(GET) : https://breakingfree.onrender.com/getuser , {} 

Logout user (authorised)(DELETE) : https://breakingfree.onrender.com/logout , {}

Logout of all devices (authorised)(DELETE) : https://breakingfree.onrender.com/logouts , {}

Upload a question (authorised)(admin)(POST) : https://breakingfree.onrender.com/enterquestion , {body : {question,addiction,options}}

Get the questions (authorised)(GET) : https://breakingfree.onrender.com/getquestions , {body : {addiction}}

Join a new addiction-removal-plan (authorised)(POST) : https://breakingfree.onrender.com/makeproject , {body : {addiction}}

Get all the taken addiction-removal-plans (authorised)(admin)(GET) : https://breakingfree.onrender.com/getprojects , {}

Get a specific addiction-removal-plan (authorised)(GET) : https://breakingfree.onrender.com/getproject/:id , {params : project id}

Quit from a addiction-removal-plan (authorised)(DELETE) : https://breakingfree.onrender.com/quitproject/:id , {params : project id}

Start the addiction tracking (authorised)(POST) : https://breakingfree.onrender.com/startsessions/:id , {params : project id, body : {time}}

Update a session with answers (authorised)(patch) : https://breakingfree.onrender.com/updatesession/:id?session=<session_number>, {body : an array of {qid, option_chosen},params : product id,  query : session} 

Calculate a score of a session (authorised)(patch) : https://breakingfree.onrender.com/calculatesession/:id?session=<session_number>, {params : product id,query : session}

Get the sessions of a particular addiction-removal-plan (authorised)(get) : https://breakingfree.onrender.com/getsessions/:id , {params : project id}

Get the session score for a particular session of a plan (authorised)(get) : https://breakingfree.onrender.com/getsessionscore/:id?session=<session_number> , {params : project id, query : session}

## copying the .env.example file to .env file

|-- create a dev.env file in the root directory
|-- copy .env.example to .env
|-- add values to the env variables

## Table of Contents

- [Project Structure](#project-structure)
<!-- - [Error Handling](#error-handling)
- [Logging](#logging) -->


## Project Structure

```
src\
 |--api
     |--controllers\  # Route controllers (controllers layer)
     |--helpers\      # Contains helper files
     |--middlewares\  # Custom express middlewares
     |--models\       # Mongoose models (data layer)
     |--routes\       # Routes
 |--config\           # Envoriment variables and configuration related things
 |--db\               # Database connection
 |--app.js            # Express app
 |--index.js          # App entry point

```