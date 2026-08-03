const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());        //! Allows our React dashboard to communicate with backend.
app.use(express.json());    //! Allows backend to understand JSON data. since later ESP32 will send json data


// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "AstraShield Backend is running"
    });
});


module.exports = app;