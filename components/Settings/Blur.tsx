import React from 'react';
import { Form, Button } from 'react-bootstrap';
import globalStyles from '../../styles/Settings/Settings.module.css';
import styles from '../../styles/Settings/Blur/Blur.module.css';

interface Props {
  blur: boolean,
  setBlur: Function
}
const Blur: React.FC<Props> = ({ blur, setBlur }) => {
  return (
    <div className={globalStyles.settingModuleContainer}>

      <div className={styles.blurContainer}>
        <Form.Group className={globalStyles.toggle}>
          <Form.Label>Background blur</Form.Label>
          <Form.Check
            type="switch"
            id="custom-switch"
            checked={blur}
            onChange={() => setBlur(!blur)}
          />
        </Form.Group>
      </div>
    </div>
  );
};

export default Blur;