import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface Props {
  show: boolean;
  handleClose: any;
}

const TimerModal: React.FC<Props> = ({ show, handleClose }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Timer Done</Modal.Title>
        </Modal.Header>
        <Modal.Body>Timer done!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
            }}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TimerModal;
