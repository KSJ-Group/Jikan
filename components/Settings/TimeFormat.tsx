import React from 'react';
import { Form } from 'react-bootstrap'
import globalStyles from '../../styles/Settings/Settings.module.css';
import styles from '../../styles/Settings/TimeFormat/TimeFormat.module.css';

interface Props {
  is24Hour: boolean,
  setIs24Hour: Function
}

const TimeFormat: React.FC<Props> = ({ is24Hour, setIs24Hour }) => {
  return (
    <div className={styles.timeFormatContainer}>
      <div className={globalStyles.settingModuleContainer}>
        <Form.Group className={globalStyles.toggle}>
          <Form.Label className={globalStyles.toggleLabel}>24 hour format</Form.Label>
          <Form.Check
            type="switch"
            id="custom-switch"
            checked={is24Hour}
            onChange={() => setIs24Hour(!is24Hour)}
          />
        </Form.Group>
      </div>
    </div>
  );
};

export default TimeFormat;