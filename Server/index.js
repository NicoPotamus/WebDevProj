//Nicolas DeMilio

// Importing the express module
const express = require('express');
const app = express();
const userController = require("./controllers/users.js")

const PORT = 3000
//MiddleWare
app.use(express.json())
app.use(express.static(__dirname + "/dist"))

app.get("/", (req, res) => {
    res.send('HomePage')
})
    
    .use("/api/v1/user", userController) 


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})

