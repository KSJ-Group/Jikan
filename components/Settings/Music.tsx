import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styles from "../../styles/Settings/Settings.module.css";

interface Props {
  selectedMusic: string;
  setMusic: Function;
  music: { title: string, url: string }[];
}

const Music: React.FC<Props> = ({ selectedMusic, setMusic, music }) => {
  const [availMusic, setAvailMusic] = useState<{ title: string, url: string }[]>(music);
  const [currentTitle, setCurrent] = useState<string>('');
  const [musicPlaying, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    for (let i = 0; i < availMusic.length; i++) {
      if (availMusic[i].url === selectedMusic) {
        setCurrent(availMusic[i].title);
      }
    }
  }, [selectedMusic])

  useEffect(() => {
    if (currentTitle !== 'None') {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [currentTitle])

  const changeMusic = (e: any): void => {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    for (let i = 0; i < availMusic.length; i++) {
      if (availMusic[i].title === target.value) {
        setMusic(availMusic[i].url);
        if (target.value === 'None') {
          setPlaying(false);
        } else {
          setPlaying(true);
        }
        break;
      }
    }

  };

  const stopMusic = (): void => {
    setMusic('None');
    setPlaying(false);
  }

  return (
    <div className={styles.music}>
      <Form.Group className={styles.font}>
        <Form.Label>Music</Form.Label>
        <div className={styles.musicDiv}>
          <Form.Select
            value={currentTitle}
            onChange={(e) => changeMusic(e)}
          >
            {availMusic.map((music) => (
              <option key={music.title} value={music.title}>
                {music.title}
              </option>
            ))}
          </Form.Select>
          {musicPlaying ? <button onClick={stopMusic} className={styles.stop}>Stop</button> : null}
        </div>
      </Form.Group>
    </div>
  );
};

export default Music;
