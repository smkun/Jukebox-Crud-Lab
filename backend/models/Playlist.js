//models/Playlist.js
const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    name: String,
    tracks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Track",
        },
    ],
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
