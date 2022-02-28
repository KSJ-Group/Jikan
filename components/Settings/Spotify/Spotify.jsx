import React, { useState, useEffect } from "react";
import styles from "../../../styles/Settings/Spotify/Spotify.module.css";
import globalStyles from "../../../styles/Settings/Settings.module.css";
import axios from "axios";
import { Form } from "react-bootstrap";
import Tracks from "./Tracks";
import Player from "./Player";

const Spotify = () => {
  const [token, setToken] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [playlistName, setPlaylistName] = useState("");
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();

  const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000";
  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    "streaming",
    "playlist-read-private",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-modify-playback-state",
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
  const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
  const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/playlists/";

  const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      // console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});

    return paramsSplitUp;
  };

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
      // localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      setToken(access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  });

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  const handleGetPlaylists = () => {
    axios
      .get(PLAYLISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setPlaylists(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      handleGetPlaylists();
    }
  }, [token]);

  useEffect(() => {
    if (playlists.length) {
      setCurrentPlaylist(playlists[0]);
    }
  }, [playlists]);

  useEffect(() => {
    let selected = playlists.find((playlist) => {
      return playlist.name === playlistName;
    });
    setCurrentPlaylist(selected);
  }, [playlistName]);

  const handleGetPlaylistTracks = () => {
    axios
      .get(PLAYLIST_ENDPOINT + currentPlaylist.id + "/tracks/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setTracks(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (currentPlaylist) {
      handleGetPlaylistTracks();
    }
  }, [currentPlaylist]);

  return (
    <div className={globalStyles.settingModuleContainer}>
      <div className={styles.container}>
        Spotify
        {localStorage.getItem("accessToken") ? (
          <>
            {/* <button onClick={() => signOut()}>Sign out</button> */}
            <Form.Group className={globalStyles.font}>
              <Form.Label>Select Playlist</Form.Label>
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
            </Form.Group>
          </>
        ) : (
          <div>
            Not signed in <br />
            <button onClick={handleLogin}>Sign in</button>
          </div>
        )}
        <Tracks tracks={tracks} setCurrentTrack={setCurrentTrack} />
        <Player token={token} currentTrack={currentTrack} tracks={tracks} />
      </div>
    </div>
  );
};

export default Spotify;
