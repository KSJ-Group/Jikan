import React from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from '../../styles/Settings/Settings.module.css';

interface Props {
  autoStartBreak: boolean,
  setAutoStartBreak: Function
}

const AutoStartBreak: React.FC<Props> = ({ autoStartBreak, setAutoStartBreak }) => {
  return (
    <div>
      <Form.Group className={styles.toggle}>
        <Form.Label>Auto-start breaks?</Form.Label>
        <Form.Check
          type="switch"
          id="custom-switch"
          onChange={() => setAutoStartBreak(!autoStartBreak)}
        />
      </Form.Group>
    </div>

  );
};

export default AutoStartBreak;