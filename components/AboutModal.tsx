import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from '../styles/Settings/Settings.module.css';
import Button from 'react-bootstrap/Button';

interface Props {
  setShowSettings: Function
}

const AboutModal: React.FC<Props> = ({ setShowSettings }) => {
  const [showModal, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleOpen = () => {
    // setShowSettings(false);
    setShow(true);
  }

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.about} onClick={handleOpen}>ⓘ About Jikan</div>
      <Modal
        show={showModal}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        className={styles.infoModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>About Jikan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.modalDiv}>
            <h2>What is Jikan?</h2>
            <div>Jikan is a web application that features a digital clock and a Pomodoro timer. Amongst all of the pomodoro timer websites that exist online, there wasn't one that was highly customizable. Jikan allows for a variety of customizability, allowing users to change background images, font style, background music, clock format, and more. Leave it open an extra monitor or in the background - the choice is yours. Start being productive now.</div>
            <p />

            <h2>What is Pomodoro?</h2>
            <div>"The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer Cirillo used as a university student."</div>
            <a href='https://en.wikipedia.org/wiki/Pomodoro_Technique' target="_blank">Source: Wikipedia</a>
            <p />

            <h2>Creators</h2>
            <div>
              <div>Connect with us:</div>
              <ul>
                <li>Seiji Matsumoto <a href='https://linkedin.com/in/seiji-matsumoto' target="_blank">LinkedIn</a> | <a href='https://github.com/SeijiMatsumoto' target="_blank">GitHub</a></li>
                <li>Katie Law <a href='https://www.linkedin.com/in/katielaw1997/' target="_blank">LinkedIn</a> | <a href='https://github.com/katscap' target="_blank">GitHub</a></li>
                <li>June Lee <a href='https://www.linkedin.com/in/juneh-lee/' target="_blank">LinkedIn</a> | <a href='https://github.com/juneisenuj' target="_blank">GitHub</a></li>
              </ul>
              <p />

              <h2>GitHub</h2>
              <div><a href="https://github.com/KSJ-Group/Jikan" target="_blank">Link to repository</a></div>
              <p />

              <h2>Feedback</h2>
              <div>
                <div>Have any feedback, suggestions, or questions? Feel free to contact us!</div>
                <a className={styles.emailBtn} href="mailto:seijim27@gmail.com?subject=[Jikan Inquiry] " target="_blank"><div className={styles.emailDiv}>Email</div></a>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.modalBtn} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AboutModal;