//Nicolas DeMilio

// Importing the express module
const express = require('express')
const app = express()
const userController = require('./controllers/users.js')

const PORT = 3000
//MiddleWare
app.use(express.json())
app.use(express.static(__dirname + "/dist"))


//routes -> controller
app.get("/", (req, res, next) => {
    res.send('HomePage')
})
    
    .use("/api/v1/user", userController) 

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

