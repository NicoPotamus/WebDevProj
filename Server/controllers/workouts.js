
const model = require("../model/workouts")
const express = require("express")
const app = express.Router()

app.get("/:uId", (req, res, next) => {//get all workouts for user
    const uId = req.params.uId
    model
        .getAll(uId)
        .then((data) => res.send(data))
        .catch(next)
})
    .get("/:uId/:id", (req, res, next) => {//get a specific workout for user
        const uId = req.params.uId
        const id = req.params.id
        model
            .getById(uId, id)
            .then((data) => res.send(data))
            .catch(next)
    })
    .post("/:uId", (req, res, next) => {//add a workout to a user
        const uId = req.params.uId
        model
            .add(uId, req.body)
            .then((data) => res.send(data))
            .catch(next)
    })
    .patch("/:uId/:id", (req, res, next) => {//update a workout for user
        const uId = req.params.uId
        const id = req.params.id
        model
            .update(uId, id, req.body)
            .then((data) => res.send(data))
            .catch(next)
    })
    .delete("/:uId/:id", (req, res, next) => {//delete a workout for user
        const uId = req.params.uId
        const id = req.params.id
        model
            .remove(uId, id)
            .then((data) => res.send(data))
            .catch(next)
    })