//components/MySongs.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const MySongs = () => {
    const [songs, setSongs] = useState([]);
    const audioRefs = useRef([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5001/api/tracks"
                );
                setSongs(response.data);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };
        fetchSongs();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/tracks/${id}`);
            setSongs(songs.filter((song) => song._id !== id));
        } catch (error) {
            console.error("Error deleting song:", error);
        }
    };

    const pauseAllTracks = (currentIndex) => {
        audioRefs.current.forEach((audioRef, index) => {
            if (index !== currentIndex && !audioRef.paused) {
                audioRef.pause();
            }
        });
    };

    return (
        <div>
            <h2>My Songs</h2>
            <ul>
                {songs.map((song, index) => (
                    <li
                        key={song._id}
                        className="song-item">
                        <img
                            src={song.coverArtUrl}
                            alt={song.title}
                            width="50"
                        />
                        <div>
                            <strong>{song.title}</strong> by {song.artist}
                            <div className="song-controls">
                                {song.previewUrl ? (
                                    <audio
                                        ref={(el) =>
                                            (audioRefs.current[index] = el)
                                        }
                                        src={song.previewUrl}
                                        controls
                                        onPlay={() => pauseAllTracks(index)}
                                    />
                                ) : (
                                    <span>No preview available.</span>
                                )}
                                <button onClick={() => handleDelete(song._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MySongs;
