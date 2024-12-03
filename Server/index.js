//Nicolas DeMilio

// Importing the express module
const express = require('express')
const app = express()
const userController = require('./controllers/users.js')
const exerciseController=require("./controllers/exercises.js")
const followingController = require('./controllers/following.js')
const statsController = require('./controllers/stats.js')

const PORT = 3000
//MiddleWare
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
})

app.use(express.json())
app.use(express.static(__dirname + "/dist"))


//routes -> controller
app.get("/", (req, res, next) => {
    res.send('HomePage')
})
    
    .use("/api/v1/user", userController) 
    .use("/api/v1/exercise", exerciseController)   
    .use("/api/v1/following", followingController)
    .use("/api/v1/stats", statsController)


    .get("*", (req, res, next) => {
        res.sendFile(__dirname + "/dist/index.html")
    })

// Error Handling
app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status ?? 500).send(err)
})

app.listen(PORT, (err, data) => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})

