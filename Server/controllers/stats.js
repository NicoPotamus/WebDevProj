const statsModel = require("../model/stats");
const express = require("express");
const app = express.Router();

/**
 * Get a user's stats by ID
 */
app.get("/:id", (req, res, next) => {
    const id = req.params.id;
    statsModel
        .getById(+id)
        .then((data) => res.send(data))
        .catch(next);
});

/**
 * Add a user's stats
 */
app.post("/", (req, res, next) => {
    statsModel
        .add(req.body)
        .then((data) => res.send(data))
        .catch(next);
});

/**
 * Update a user's stats
 */
app.patch("/:id", (req, res, next) => {
    const id = req.params.id;
    statsModel
        .update(+id, req.body)
        .then((data) => res.send(data))
        .catch(next);
});

/**
 * Delete a user's stats
 */
app.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    statsModel
        .remove(+id)
        .then((data) => res.send(data))
        .catch(next);
});

module.exports = app;