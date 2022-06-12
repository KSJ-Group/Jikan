import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface Props {
  show: boolean;
  handleClose: any;
  breakFromModal(choice: string): void;
}

const TimerModal: React.FC<Props> = ({ show, handleClose, breakFromModal }) => {
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
        <Modal.Body>Timer done! Select an option below.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => {
              breakFromModal("pomodoro");
              handleClose();
            }}
          >
            Start Pomodoro
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => {
              breakFromModal("shortBreak");
              handleClose();
            }}
          >
            Start Break
          </Button>
          {/* <Button
            variant="outline-dark"
            onClick={() => {
              breakFromModal("longBreak");
              handleClose();
            }}
          >
            Start Long Break
          </Button> */}
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TimerModal;
