import React from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from '../../styles/Settings/Settings.module.css';

const ShowSeconds = () => {
  return (
    <div>
      <Form.Group className={styles.toggle}>
        <Form.Label>Show seconds</Form.Label>
        <Form.Check
          type="switch"
          id="custom-switch"
        />
      </Form.Group>
    </div>
  );
};

export default ShowSeconds;