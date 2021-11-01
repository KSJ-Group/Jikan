const SpotifyWebApi = require("spotify-web-api-node");

export default async function spotify() {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: "http://localhost:3000",
  });

  spotifyApi.setAccessToken(process.env.SPOTIFY_REFRESH_TOKEN);
  spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
    function (data) {
      console.log("Artist albums", data.body);
    },
    function (err) {
      console.error(err);
    }
  );
}
