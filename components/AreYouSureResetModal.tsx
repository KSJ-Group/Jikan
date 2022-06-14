import { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface Props {
  show: boolean;
  setShowConfirm: Function;
}

const AreYouSureResetModal = ({ show, setShowConfirm }: Props) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShowConfirm(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset All ⚠</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to reset all settings and data? All data, such as your recents and favorites, will be deleted and reset to default.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={() => {
            localStorage.clear();
            setShowConfirm(false);
            location.reload();
          }}>Reset</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AreYouSureResetModal;