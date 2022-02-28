import React, { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Track from './Track';
import styles from '../../../styles/Settings/Spotify/Spotify.module.css';

interface Props {
  tracks: any;
  setCurrentTrack: Function;
}

const Tracks: React.FC<Props> = ({ tracks, setCurrentTrack }) => {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Playlist Tracks</Accordion.Header>
        <Accordion.Body className={styles.accordionBody}>
          {tracks.map((track: any, i: number) => {
            return (
              <Track track={track.track} setCurrentTrack={setCurrentTrack} key={track.track.title + i.toString()} />
            )
          })}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Tracks;