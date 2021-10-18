import React, { useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import styles from '../styles/Settings/Settings.module.css'
import { SettingsContext } from "./SettingsContext";

interface Props {
  showModal: boolean;
  handleClose: Function;
}

const LoginModal: React.FC<Props> = ({ showModal, handleClose }) => {
  const {
    isLoggedIn,
    setIsLoggedIn
  } = useContext(SettingsContext)

  const responseSuccess = (res) => {
    console.log(res);
    console.log(res.profileObj);
    setIsLoggedIn(true);
    handleClose();
  }

  const responseFailure = (res) => {
    console.log(res)
    console.log(res.profileObj);
  }

  return (
    <div>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign in with Google</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <GoogleLogin
            className={styles.loginBtn}
            clientId='969191091168-jfg0qkhlgfbg4bc851q7h0ujhpprvr2k.apps.googleusercontent.com'
            buttonText='Sign in'
            onSuccess={responseSuccess}
            onFailure={responseFailure}
            cookiePolicy={'single_host_origin'}
          />
        </Modal.Body>
        {/* <Modal.Footer>

          </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default LoginModal;