//Nicolas DeMilio

const model = require("../model/users")
const express = require("express")
const app = express.Router()

app.get("/", (req, res, next) => {//This is the route that will be used to get all the data from the users.json file
    model
        .getAll()
        .then((data) => res.send(data))
        .catch(next)
})
    .get("/:id", (req, res, next) => {//This is the route that will be used to get a specific user from the users.json file
        const id = req.params.id
        model
            .getById(+id)
            .then((data) => res.send(data))
            .catch(next)
    })

    .post("/", (req, res, next) => {//This is the route that will be used to Add a user to the users.json file
        model
            .add(req.body)
            .then((data) => res.send(data))
            .catch(next)
    })

    .patch("/:id", (req, res, next) => {//This is the route that will be used to Update a user in the users.json file
        const id = req.params.id
        model
            .update(+id, req.body)
            .then((data) => res.send(data))
            .catch(next)
    })

    .delete("/:id", (req, res, next) => {//This is the route that will be used to Delete a user from the users.json file
        const id = req.params.id
        model
            .remove(+id)
            .then((data) => res.send(data))
            .catch(next)
    })
    .post("/seed", (req, res, next) => {//This is the route that will be used to seed the users.json file
        model
            .seed()
            .then((data) => res.send(data))
            .catch(next)
    })
    .get("/:email/:password", (req, res, next) => {//This is the route that will be used to get a user by email and password from the users.json file
        const email = req.params.email
        const password = req.params.password
        model
            .login(email, password)
            .then((data) => res.send(data))
            .catch(next)
    })


    module.exports = app