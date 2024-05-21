//components/SearchSpotify.jsx
import React, { useState } from "react";
import axios from "axios";

const SearchSpotify = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `http://localhost:5001/api/search?query=${query}`
            );
            setResults(response.data);
            if (response.data.length === 0) {
                setMessage("No results found.");
            } else {
                setMessage("");
            }
        } catch (error) {
            console.error("Error searching tracks:", error);
            setMessage("Error searching tracks.");
        }
    };

    const addTrackToDatabase = async (track) => {
        try {
            const newTrack = {
                title: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                coverArtUrl: track.album.images[0].url,
                spotifyUrl: track.external_urls.spotify,
                spotifyId: track.id,
                previewUrl: track.preview_url, // Store the preview URL
            };
            await axios.post("http://localhost:5001/api/tracks", newTrack);
            setMessage("Track added to My Songs.");
        } catch (error) {
            console.error("Error adding track to database:", error);
            setMessage("Error adding track to My Songs.");
        }
    };

    return (
        <div>
            <h2>Search Spotify</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by artist or title"
                />
                <button type="submit">Search</button>
            </form>
            {message && <p>{message}</p>}
            <ul>
                {results.map((track) => (
                    <li key={track.id}>
                        <img
                            src={track.album.images[0].url}
                            alt={track.name}
                            width="50"
                        />
                        <div>
                            <strong>{track.name}</strong> by{" "}
                            {track.artists[0].name}
                            <button onClick={() => addTrackToDatabase(track)}>
                                Add to My Songs
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchSpotify;
