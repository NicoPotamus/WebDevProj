const followingModel = require("../model/following");
const express = require("express");
const app = express.Router();

/**
 * Get the list of users a specific user is following
 */
app.get("/:userId", (req, res, next) => {
    const userId = req.params.userId;
    followingModel
        .getFollowing(+userId)
        .then((data) => res.send(data))
        .catch(next);
});

/**
 * Add a following relationship
 */
app.post("/", (req, res, next) => {
    const { userId, followingUserId } = req.body;
    followingModel
        .add(userId, followingUserId)
        .then((data) => res.send(data))
        .catch(next);
});

/**
 * Remove a following relationship
 */
app.delete("/", (req, res, next) => {
    const { userId, followingUserId } = req.body;
    followingModel
        .remove(userId, followingUserId)
        .then((data) => res.send(data))
        .catch(next);
});

module.exports = app;