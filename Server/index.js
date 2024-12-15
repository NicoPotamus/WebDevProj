require("dotenv").config();
const express = require("express");
const app = express();
const workoutController = require("./controllers/workouts.js");
const userController = require("./controllers/users.js");
const exerciseController = require("./controllers/exercises.js");
const followingController = require("./controllers/following.js");
const statsController = require("./controllers/stats.js");
const loginController = require("./controllers/login.js");
const authenticateJWT = require("./middlewar/auth.js");
const cors = require("cors");
const PORT = 3000;

// Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(cors());

app.use(express.json());
app.use(express.static(__dirname + "../Client/dist"));

// Public routes
app.get("/", (req, res, next) => {
    res.send('HomePage');
})

// Login route (public)
.use("/api/v1/user/login", loginController)

// Protected routes
app.use("/api/v1/workouts", authenticateJWT, workoutController);
app.use("/api/v1/user", authenticateJWT, userController);
app.use("/api/v1/exercises", authenticateJWT, exerciseController);
app.use("/api/v1/following", authenticateJWT, followingController);
app.use("/api/v1/stats", authenticateJWT, statsController);

app.get("*", (req, res, next) => {
    res.sendFile(__dirname + "../Client/dist/index.html");
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status ?? 500).send(err);
});

app.listen(PORT, (err, data) => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

module.exports = app;
