import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from '../styles/Settings/Settings.module.css';
import Button from 'react-bootstrap/Button';

const AboutModal: React.FC = () => {
  const [showModal, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleOpen = () => {
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
          <div>
            <h2>What is Jikan?</h2>
            <p>Jikan is a web application that features a digital clock and a Pomodoro timer. With many already existing Pomodoro timers online, there wasn't one that was designed to be personalized. Jikan allows for a variety of customizability, allowing users to change background images, font style, background music, clock format, and more.</p>

            <h2>What is Pomodoro?</h2>
            <div>The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s.[1] It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer Cirillo used as a university student.</div>
            <p><a href='https://en.wikipedia.org/wiki/Pomodoro_Technique'>Source: Wikipedia</a></p>

            <h2>Creators</h2>
            <div>
              This application was built by a team of three:
              <ul>
                <li><a href='https://linkedin.com/in/seiji-matsumoto'>Seiji Matsumoto</a></li>
                <li><a href='https://www.linkedin.com/in/katielaw1997/'>Katie Law</a></li>
                <li><a href='https://www.linkedin.com/in/juneh-lee/'>June Lee</a></li>
              </ul>
              <p></p>

              <h2>GitHub</h2>
              <div><a href="https://github.com/KSJ-Group/Jikan">Link to repository</a></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AboutModal;