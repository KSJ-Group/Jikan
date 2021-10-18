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
      title: 'Lofi Hip Hop',
      url: 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1'
    },
    {
      title: 'Weekend Jazz',
      url: 'https://www.youtube.com/embed/uKTUW9niMYg?autoplay=1'
    },
    {
      title: 'Calm Piano',
      url: 'https://www.youtube.com/embed/XULUBg_ZcAU?autoplay=1'
    },
    {
      title: 'Relaxing Sleep',
      url: 'https://www.youtube.com/embed/n4M8j6ic1Ts?autoplay=1'
    },
    {
      title: 'Soothing Rain',
      url: 'https://www.youtube.com/embed/ZddHkhVUf2c?autoplay=1'
    },
    {
      title: 'Sounds of Nature',
      url: 'https://www.youtube.com/embed/gfo2xZ2SMjc?autoplay=1'
    },
    {
      title: 'Deep Focus',
      url: 'https://www.youtube.com/embed/8N-eLvmheSE?autoplay=1'
    },
    {
      title: 'Spooky Halloween Music',
      url: 'https://www.youtube.com/embed/qJSLmjzLnAM?autoplay=1'
    }
  ]
  const [availMusic, setAvailMusic] = useState<{ title: string, url: string }[]>(music);
  const [currentTitle, setCurrent] = useState<string>('');

  useEffect(() => {
    for (let i = 0; i < availMusic.length; i++) {
      if (availMusic[i].url === selectedMusic) {
        setCurrent(availMusic[i].title);
      }
    }
  }, [selectedMusic])

  const changeMusic = (e: any) => {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    for (let i = 0; i < availMusic.length; i++) {
      if (availMusic[i].title === target.value) {
        setMusic(availMusic[i].url);
        break;
      }
    }
  };

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
        </div>
      </Form.Group>
    </div>
  );
};

export default Music;
