import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styles from "../../styles/Settings/Settings.module.css";

interface Props {
  selectedMusic: string;
  setMusic: Function;
}

const Music: React.FC<Props> = ({ selectedMusic, setMusic }) => {
  const music = [
    {
      title: 'None',
      url: 'None'
    },
    {
      title: 'Anime Lofi',
      url: '//www.youtube.com/embed/w3LWHIz3bMc?autoplay=1'
    },
    {
      title: 'Calm Piano',
      url: '//www.youtube.com/embed/XULUBg_ZcAU?autoplay=1'
    },
    {
      title: 'Deep Focus',
      url: '//www.youtube.com/embed/8N-eLvmheSE?autoplay=1'
    },
    {
      title: 'Lofi Hip Hop',
      url: '//www.youtube.com/embed/5qap5aO4i9A?autoplay=1'
    },
    {
      title: 'Nintendo Radio',
      url: '//www.youtube.com/embed/tOnOutGHcRQ?autoplay=1'
    },
    {
      title: 'Relaxing Sleep',
      url: '//www.youtube.com/embed/n4M8j6ic1Ts?autoplay=1'
    },
    {
      title: 'Soothing Rain',
      url: '//www.youtube.com/embed/ZddHkhVUf2c?autoplay=1'
    },
    {
      title: 'Sounds of Nature',
      url: '//www.youtube.com/embed/gfo2xZ2SMjc?autoplay=1'
    },
    {
      title: 'Spooky Halloween Music',
      url: '//www.youtube.com/embed/qJSLmjzLnAM?autoplay=1'
    },
    {
      title: 'The Good Life',
      url: '//www.youtube.com/embed/36YnV9STBqc?autoplay=1'
    },
    {
      title: 'Weekend Jazz',
      url: '//www.youtube.com/embed/uKTUW9niMYg?autoplay=1'
    },
  ]
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
