import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

interface Props {
  token: string;
  currentTrack: any;
  tracks: any;
}

const Player: React.FC<Props> = ({ token, currentTrack, tracks }) => {
  const [uris, setUris] = useState<string[]>([]);

  useEffect(() => {
    if (tracks.length) {
      let temp: any = [];
      tracks.forEach((track: any) => {
        temp.push(track.track.uri)
      })
      setUris(temp);
    }
  }, [tracks])

  return (
    <div>
      {uris.length &&
        <SpotifyPlayer
          token={token}
          uris={uris}
          autoPlay
          styles={{
            activeColor: '#fff',
            bgColor: '#333',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
          }}
        />}
    </div>
  );
};

export default Player;