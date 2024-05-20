//models/Track.js
const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    coverArtUrl: String,
    spotifyUrl: String,
    spotifyId: String,
    previewUrl: String,
});

module.exports = mongoose.model("Track", TrackSchema);
