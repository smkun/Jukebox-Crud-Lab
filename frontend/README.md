## Jukebox App

Welcome to the Jukebox App! This is a full-stack application that allows users to manage their music tracks and playlists, search for songs on Spotify, and play previews of their favorite tracks.

### Project Structure

```
.
├── backend
│   ├── models
│   │   ├── Playlist.js
│   │   └── Track.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   │   ├── playlistRoutes.js
│   │   └── trackRoutes.js
│   └── server.js
└── frontend
    ├── README.md
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   ├── MyPlaylists.jsx
    │   │   ├── MySongs.jsx
    │   │   └── SearchSpotify.jsx
    │   └── index.css
    └── vite.config.js
```

### Features

-   **Frontend**: Built with React, allowing users to view and manage songs and playlists, and search for tracks on Spotify.
-   **Backend**: Built with Node.js and Express, providing APIs to interact with the MongoDB database for tracks and playlists management.
-   **Database**: MongoDB is used to store songs and playlists.

### Requirements

-   Node.js
-   npm (or yarn)
-   MongoDB
-   Spotify Developer Account (for Spotify API integration)

### Setup Instructions

1. **Clone the repository**:

    ```sh
    git clone <repository_url>
    cd <repository_directory>
    ```

2. **Set up environment variables**:

    Create a `.env` file in the `backend` directory with the following variables:

    ```
    MONGODB_URI=<your_mongodb_connection_string>
    SPOTIFY_CLIENT_ID=<your_spotify_client_id>
    SPOTIFY_CLIENT_SECRET=<your_spotify_client_secret>
    ```

3. **Install dependencies**:

    Navigate to the `backend` and `frontend` directories and install dependencies using npm:

    ```sh
    cd backend
    npm install

    cd ../frontend
    npm install
    ```

4. **Run the backend server**:

    In the `backend` directory, start the backend server:

    ```sh
    node server.js
    ```

    The backend server should now be running on `http://localhost:5000`.

5. **Run the frontend development server**:

    In the `frontend` directory, start the frontend development server:

    ```sh
    npm run dev
    ```

    The frontend development server should now be running, and you can access the app at the URL provided by Vite.

### Usage

-   **My Songs**: View, play, and delete songs stored in the database.
-   **My Playlists**: Create, edit, delete, and play playlists composed of songs from the database.
-   **Search Spotify**: Search for tracks on Spotify and add them to your songs database.

### Contributing

Feel free to submit issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

Enjoy using the Jukebox App! If you have any questions or feedback, feel free to reach out.
