import React from 'react';
import { Form, Button } from 'react-bootstrap'
import globalStyles from '../../styles/Settings/Settings.module.css';
import styles from '../../styles/Settings/TimeFormat/TimeFormat.module.css';

interface Props {
  is24Hour: boolean,
  setIs24Hour: Function
}

const TimeFormat: React.FC<Props> = ({ is24Hour, setIs24Hour }) => {
  return (
    <div className={styles.timeFormatContainer}>
      <Form.Group className={globalStyles.toggle}>
        <Form.Label>24 hour format</Form.Label>
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