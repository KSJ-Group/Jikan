const clientID = "23adc876e5ac4bf7beae3e7a30f3899c";
const authUrl = "https://accounts.spotify.com/authorize";
const redirect = "http://localhost:3000";

export default function handleLogin() {
  window.location = `${authUrl}?client_id=${clientID}&redirect_uri=${redirect}&response_type=token&show_dialog=true`;
}
