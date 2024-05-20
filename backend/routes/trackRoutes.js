
//routes/trackRoutes.js
const express = require("express");
const router = express.Router();
const Track = require("../models/Track");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Function to refresh the access token
const refreshAccessToken = async () => {
    try {
        const data = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(data.body["access_token"]);
        console.log("Spotify access token granted");
    } catch (error) {
        console.error("Failed to retrieve access token", error);
    }
};

// Get initial access token from Spotify
refreshAccessToken();

// Middleware to refresh access token if expired
const checkAccessToken = async (req, res, next) => {
    try {
        const token = spotifyApi.getAccessToken();
        if (!token) {
            await refreshAccessToken();
        }
        next();
    } catch (error) {
        console.error("Error refreshing access token", error);
        res.status(500).send("Failed to refresh access token");
    }
};

// Search for a track
router.get("/search", checkAccessToken, async (req, res) => {
    try {
        const { query } = req.query;
        const response = await spotifyApi.searchTracks(query);
        res.json(response.body.tracks.items);
    } catch (error) {
        console.error("Error searching Spotify:", error);
        res.status(500).send(
            `An error occurred while communicating with Spotify's Web API.\nDetails: ${error.message}`
        );
    }
});

// Get all tracks
router.get("/tracks", async (req, res) => {
    try {
        const tracks = await Track.find();
        res.json(tracks);
    } catch (error) {
        console.error("Error fetching tracks:", error);
        res.status(500).send(error.message);
    }
});

// Add a new track
router.post("/tracks", async (req, res) => {
    try {
        const {
            title,
            artist,
            album,
            coverArtUrl,
            spotifyUrl,
            spotifyId,
            previewUrl,
        } = req.body;
        const newTrack = new Track({
            title,
            artist,
            album,
            coverArtUrl,
            spotifyUrl,
            spotifyId,
            previewUrl,
        });
        await newTrack.save();
        res.status(201).json(newTrack);
    } catch (error) {
        console.error("Error adding track to database:", error);
        res.status(500).send(error.message);
    }
});

// Update a track
router.put("/tracks/:id", async (req, res) => {
    try {
        const updatedTrack = await Track.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedTrack);
    } catch (error) {
        console.error("Error updating track:", error);
        res.status(500).send(error.message);
    }
});

// Delete a track
router.delete("/tracks/:id", async (req, res) => {
    try {
        await Track.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting track:", error);
        res.status(500).send(error.message);
    }
});

module.exports = router;
