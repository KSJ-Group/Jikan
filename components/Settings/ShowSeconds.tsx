import React from 'react';
import { Form, Button } from 'react-bootstrap';
import globalStyles from '../../styles/Settings/Settings.module.css';
import styles from '../../styles/Settings/ShowSeconds/ShowSeconds.module.css';

interface Props {
  showSeconds: boolean,
  setShowSeconds: Function
}

const ShowSeconds: React.FC<Props> = ({ showSeconds, setShowSeconds }) => {
  return (
    <div className={styles.showSecondsContainer}>
      <Form.Group className={globalStyles.toggle}>
        <Form.Label>Show seconds</Form.Label>
        <Form.Check
          type="switch"
          id="custom-switch"
          checked={showSeconds}
          onChange={() => setShowSeconds(!showSeconds)}
        />
      </Form.Group>
    </div>
  );
};

export default ShowSeconds;