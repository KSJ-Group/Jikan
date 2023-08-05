import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface Props {
  show: boolean,
  handleClose: any,
  switchToPom: any,
  switchToShort: any,
  // switchToLong: any,
  targetMode: string
}
const AreYouSureModal: React.FC<Props> = ({ show, handleClose, switchToPom, switchToShort, targetMode }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Switch Timer Mode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to switch modes? The timer will be reset.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            if (targetMode === 'pomodoro') {
              switchToPom();
            } else if (targetMode === 'short') {
              switchToShort();
            }
            // else {
            //   switchToLong();
            // }
            handleClose();
          }}>Continue</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AreYouSureModal;