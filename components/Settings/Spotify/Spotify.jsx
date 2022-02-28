import React, { useState, useEffect, useContext } from "react";
import styles from "../../../styles/Settings/Spotify/Spotify.module.css";
import globalStyles from "../../../styles/Settings/Settings.module.css";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Tracks from "./Tracks";
import { SettingsContext } from "../../SettingsContext";

const Spotify = () => {
  const {
    token,
    setToken,
    tracks,
    setTracks,
    playlists,
    setPlaylists,
    currentPlaylist,
    setCurrentPlaylist,
    playlistName,
    setPlaylistName,
    handleLogin,
  } = useContext(SettingsContext);

  return (
    <div className={globalStyles.settingModuleContainer}>
      <div className={styles.container}>
        <Form.Group className={globalStyles.font}>
          <Form.Label>Spotify</Form.Label>
          {token ? (
            <>
              <div className={styles.musicDiv}>
                <Form.Select
                  value={playlistName}
                  onChange={(e) => {
                    setPlaylistName(e.target.value);
                  }}
                >
                  {playlists.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </>
          ) : (
            <div className={styles.signInContainer}>
              <button className={styles.loginBtn} onClick={handleLogin}>
                Sign in to retrieve playlists
              </button>
            </div>
          )}
        </Form.Group>
        {/* <Tracks tracks={tracks} setCurrentTrack={setCurrentTrack} /> */}
        {/* <Player token={token} tracks={tracks} /> */}
      </div>
    </div>
  );
};

export default Spotify;
