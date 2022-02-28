import React, { useContext, useEffect } from "react";
import { SettingsContext } from "./SettingsContext";
import Player from "./Player";
import styles from "../styles/Music/Spotify.module.css";
import axios from "axios";

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

  const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
  const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/playlists/";

  const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
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
      setToken(access_token);
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    } else {
      if (localStorage.getItem("accessToken")) {
        handleLogin();
      }
    }
  }, []);

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
        // window.location.href = "https://jikan-timer.com";
        handleLogin();
      });
  };

  const removeHash = () => {
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  };
  useEffect(() => {
    if (token) {
      handleGetPlaylists();
      removeHash();
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
        // window.location.href = "https://jikan-timer.com";
        handleLogin();
      });
  };

  useEffect(() => {
    if (currentPlaylist) {
      handleGetPlaylistTracks();
    }
  }, [currentPlaylist]);

  return (
    <div className={styles.spotifyPlayer}>
      <div className={styles.innerSpotify}>
        <Player token={token} tracks={tracks} />
      </div>
    </div>
  );
};

export default Spotify;
