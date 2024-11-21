//Nicolas DeMilio

const model = require("../model/users")
const express = require("express")
const app = express.Router()

app.get("/", (req, res) => {//This is the route that will be used to get all the data from the users.json file
    model
        .getAll()
        .then((data) => res.send(data))
        .catch(next)
})
    .get("/:id", (req, res, next) => {//This is the route that will be used to get a specific user from the users.json file
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
        model
            .update(+id, req.body)
            .then((data) => res.send(data))
            .catch(next)
    })

    .delete("/:id", (req, res, next) => {//This is the route that will be used to Delete a user from the users.json file
        model
            .remove(+id)
            .then((data) => res.sebd(data))
            .catch(next)
    })