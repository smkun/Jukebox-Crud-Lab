//components/MyPlaylist.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const MyPlaylists = () => {
    const [playlists, setPlaylists] = useState([]);
    const [editingPlaylist, setEditingPlaylist] = useState(null);
    const [playlistName, setPlaylistName] = useState("");
    const [mySongs, setMySongs] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5001/api/playlists"
                );
                setPlaylists(response.data);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        };
        fetchPlaylists();

        const fetchMySongs = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5001/api/tracks"
                );
                setMySongs(response.data);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };
        fetchMySongs();
    }, []);

    const handleEdit = (playlist) => {
        setEditingPlaylist(playlist);
        setPlaylistName(playlist.name);
        setSelectedSongs(playlist.tracks);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/playlists/${id}`);
            setPlaylists(playlists.filter((playlist) => playlist._id !== id));
        } catch (error) {
            console.error("Error deleting playlist:", error);
        }
    };

    const handleSongSelection = (song) => {
        setSelectedSongs(
            selectedSongs.find((s) => s._id === song._id)
                ? selectedSongs.filter((s) => s._id !== song._id)
                : [...selectedSongs, song]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = editingPlaylist
                ? await axios.put(
                      `http://localhost:5001/api/playlists/${editingPlaylist._id}`,
                      { name: playlistName, tracks: selectedSongs }
                  )
                : await axios.post("http://localhost:5001/api/playlists", {
                      name: playlistName,
                      tracks: selectedSongs,
                  });
            setPlaylists(
                editingPlaylist
                    ? playlists.map((playlist) =>
                          playlist._id === editingPlaylist._id
                              ? response.data
                              : playlist
                      )
                    : [...playlists, response.data]
            );
            setEditingPlaylist(null);
            setPlaylistName("");
            setSelectedSongs([]);
            setIsCreatingPlaylist(false);
        } catch (error) {
            console.error("Error saving playlist:", error);
        }
    };

    const handleCreatePlaylist = () => {
        setIsCreatingPlaylist(true);
        setEditingPlaylist(null);
        setPlaylistName("");
        setSelectedSongs([]);
    };

    const playPlaylist = (playlist) => {
        setCurrentPlaylist(playlist);
        setCurrentSongIndex(0);
        audioRef.current.src = playlist.tracks[0].previewUrl;
        audioRef.current.play();
    };

    const playNextSong = () => {
        if (currentPlaylist && currentSongIndex !== null) {
            const nextIndex = currentSongIndex + 1;
            if (nextIndex < currentPlaylist.tracks.length) {
                setCurrentSongIndex(nextIndex);
                audioRef.current.src =
                    currentPlaylist.tracks[nextIndex].previewUrl;
                audioRef.current.play();
            } else {
                setCurrentSongIndex(null);
                setCurrentPlaylist(null);
            }
        }
    };

    return (
        <div>
            <h2>My Playlists</h2>
            <button onClick={handleCreatePlaylist}>Create New Playlist</button>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist._id}>
                        <h3>{playlist.name}</h3>
                        <div className="playlist-buttons">
                            <button onClick={() => handleEdit(playlist)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(playlist._id)}>
                                Delete
                            </button>
                            <button onClick={() => playPlaylist(playlist)}>
                                Play
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {(editingPlaylist || isCreatingPlaylist) && (
                <div>
                    <h3>
                        {editingPlaylist ? "Edit Playlist" : "Create Playlist"}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            placeholder="Playlist Name"
                        />
                        <h4>Select Songs</h4>
                        <ul>
                            {mySongs
                                .filter((song) => song.previewUrl)
                                .map((song) => (
                                    <li key={song._id}>
                                        <input
                                            type="checkbox"
                                            checked={selectedSongs.find(
                                                (s) => s._id === song._id
                                            )}
                                            onChange={() =>
                                                handleSongSelection(song)
                                            }
                                        />
                                        {song.title} by {song.artist}
                                    </li>
                                ))}
                        </ul>
                        <button type="submit">
                            {editingPlaylist ? "Save" : "Create"}
                        </button>
                    </form>
                </div>
            )}

            <audio
                ref={audioRef}
                onEnded={playNextSong}
            />
        </div>
    );
};

export default MyPlaylists;
