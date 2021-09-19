import React from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from '../../styles/Settings/Settings.module.css';

interface Props {
  blur: boolean,
  setBlur: Function
}
const Blur: React.FC<Props> = ( {blur, setBlur}) => {
  return (
    <div>
      <Form.Group className={styles.toggle}>
        <Form.Label>Background blur?</Form.Label>
        <Form.Check
          type="switch"
          id="custom-switch"
          onChange={() => setBlur(!blur)}
        />
      </Form.Group>
    </div>
  );
};

export default Blur;