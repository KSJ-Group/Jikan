import React from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from '../../styles/Settings/Settings.module.css';

interface Props {
  showSeconds: boolean,
  setShowSeconds: Function
}

const ShowSeconds: React.FC<Props> = ( {showSeconds, setShowSeconds}) => {
  return (
    <div>
      <Form.Group className={styles.toggle}>
        <Form.Label>Show seconds?</Form.Label>
        <Form.Check
          type="switch"
          id="custom-switch"
          onChange={() => setShowSeconds(!showSeconds)}
        />
      </Form.Group>
    </div>
  );
};

export default ShowSeconds;