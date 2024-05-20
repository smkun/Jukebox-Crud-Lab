//routes/playlistRoutes.js
const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist");
const Track = require("../models/Track");

// Create a new playlist
router.post("/playlists", async (req, res) => {
    try {
        const { name, tracks } = req.body;

        // Ensure the tracks array contains valid track IDs
        const trackDocuments = await Track.find({ _id: { $in: tracks } });
        if (trackDocuments.length !== tracks.length) {
            return res
                .status(400)
                .json({ message: "One or more track IDs are invalid" });
        }

        const newPlaylist = new Playlist({ name, tracks });
        await newPlaylist.save();
        res.status(201).json(newPlaylist);
    } catch (error) {
        console.error("Error creating playlist:", error);
        res.status(500).send(error.message);
    }
});

// Get all playlists
router.get("/playlists", async (req, res) => {
    try {
        const playlists = await Playlist.find().populate("tracks");
        res.json(playlists);
    } catch (error) {
        console.error("Error fetching playlists:", error);
        res.status(500).send(error.message);
    }
});

// Update a playlist
router.put("/playlists/:id", async (req, res) => {
    try {
        const { name, tracks } = req.body;
        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            req.params.id,
            { name, tracks },
            { new: true }
        ).populate("tracks");
        res.json(updatedPlaylist);
    } catch (error) {
        console.error("Error updating playlist:", error);
        res.status(500).send(error.message);
    }
});

// Delete a playlist
router.delete("/playlists/:id", async (req, res) => {
    try {
        await Playlist.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting playlist:", error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
