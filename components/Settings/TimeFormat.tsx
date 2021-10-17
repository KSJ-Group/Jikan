import React from 'react';
import { Form, Button } from 'react-bootstrap'
import styles from '../../styles/Settings/Settings.module.css';

interface Props {
  is24Hour: boolean,
  setIs24Hour: Function
}

const TimeFormat: React.FC<Props> = ({ is24Hour, setIs24Hour }) => {
  return (
    <div className={styles.timeFormat}>
      <Form.Group className={styles.toggle}>
        <Form.Label>24 Hour Format?</Form.Label>
        <Form.Check
          type="switch"
          id="custom-switch"
          checked={is24Hour}
          onChange={() => setIs24Hour(!is24Hour)}
        />
      </Form.Group>
    </div>
  );
};

export default TimeFormat;