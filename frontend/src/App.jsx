//App.jsx
import React, { useState } from "react";
import MySongs from "./components/MySongs";
import MyPlaylists from "./components/MyPlaylists";
import SearchSpotify from "./components/SearchSpotify";
import { createRoot } from "react-dom/client";
import "./App.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

function App() {
    const [view, setView] = useState("home");

    return (
        <div className="App">
            <h1>Jukebox App</h1>
            <nav>
                <button onClick={() => setView("mySongs")}>My Songs</button>
                <button onClick={() => setView("myPlaylists")}>
                    My Playlists
                </button>
                <button onClick={() => setView("searchSpotify")}>
                    Search Spotify
                </button>
            </nav>
            {view === "home" && <p>Welcome to the Jukebox App!</p>}
            {view === "mySongs" && <MySongs />}
            {view === "myPlaylists" && <MyPlaylists />}
            {view === "searchSpotify" && <SearchSpotify />}
        </div>
    );
}

export default App;
