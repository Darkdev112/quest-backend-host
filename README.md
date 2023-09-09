## Routes
Signup with new user (POST) : http://localhost:8000/signup , {body :{username, email, password}}

Login with existing user (POST) : http://localhost:8000/login , {body : {email,password}}

Fetch user details (authorised)(GET) : http://localhost:8000/getuser , {} 

Logout user (authorised)(DELETE) : http://localhost:8000/logout , {}

Logout of all devices (authorised)(DELETE) : http://localhost:8000/logouts , {}

Upload a question (authorised)(admin)(POST) : http://localhost:8000/enterquestion , {body : {question,addiction,options}}

Get the questions (authorised)(GET) : http://localhost:8000/getquestions , {body : {addiction}}

Join a new addiction-removal-plan (authorised)(POST) : http://localhost:8000/makeproject , {body : {addiction}}

Get all the taken addiction-removal-plans (authorised)(admin)(GET) : http://localhost:8000/getprojects , {}

Get a specific addiction-removal-plan (authorised)(GET) : http://localhost:8000/getproject/:id , {params : project id}

Quit from a addiction-removal-plan (authorised)(DELETE) : http://localhost:8000/quitproject/:id , {params : project id}

Start the addiction tracking (authorised)(POST) : http://localhost:8000/startsessions/:id , {params : project id, body : {time}}

Update a session with answers (authorised)(patch) : http://localhost:8000/updatesession/:id?session=<session_number>, {body : an array of {qid, option_chosen},params : product id,  query : session} 

Calculate a score of a session (authorised)(patch) : http://localhost:8000/calculatesession/:id?session=<session_number>, {params : product id,query : session}

Get the sessions of a particular addiction-removal-plan (authorised)(get) : http://localhost:8000/getsessions/:id , {params : project id}

Get the session score for a particular session of a plan (authorised)(get) : http://localhost:8000/getsessionscore/:id?session=<session_number> , {params : project id, query : session}

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