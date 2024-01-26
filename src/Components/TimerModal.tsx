import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface Props {
  show: boolean;
  handleClose: any;
  breakFromModal(choice: string): void;
  whichDone: string;
}

const TimerModal = ({ show, handleClose, breakFromModal, whichDone }: Props) => {
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
          <Modal.Title>
            {whichDone === 'pomodoro' ? <span>Pomodoro Timer Done</span> : <span>Break Over</span>}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {whichDone === 'pomodoro' ?
            <span>Great job! You've completed a pomodoro cycle. Select an option below.</span>
            : <span>Looks like break time is over. Time to focus again!</span>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => {
              breakFromModal("pomodoro");
              handleClose();
            }}
          >
            {whichDone === 'pomodoro' ? <span>Start Pomodoro Again</span> : <span>Start Pomodoro</span>}
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => {
              breakFromModal("shortBreak");
              handleClose();
            }}
          >
            {whichDone === 'pomodoro' ? <span>Take Break</span> : <span>Take Another Break</span>}
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
