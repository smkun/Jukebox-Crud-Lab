//server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const trackRoutes = require("./routes/trackRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use("/api", trackRoutes);
app.use("/api", playlistRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

app.get("/", (req, res) => {
    res.send("Backend server is running");
});

console.log("Starting server...");
