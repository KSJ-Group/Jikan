import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

interface Props {
  token: string;
  tracks: any;
}

const Player: React.FC<Props> = ({ token, tracks }) => {
  const [uris, setUris] = useState<string[]>([]);

  const shuffle = (array: string[]): string[] => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    // remove local songs
    array = array.filter((uri: string) => {
      if (!uri.includes('local')) {
        return true;
      } else {
        return false;
      }
    })
    return array;
  }


  useEffect(() => {
    if (tracks.length) {
      let temp: any = [];
      tracks.forEach((track: any) => {
        temp.push(track.track.uri)
      })
      setUris(shuffle(temp));
    }
  }, [tracks])

  return (
    <div>
      {uris.length &&
        <SpotifyPlayer
          token={token}
          uris={uris}
          styles={{
            activeColor: '#fff',
            bgColor: '#3333336c',
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