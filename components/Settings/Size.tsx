import React, { useState, useEffect } from 'react';
import styles from '../../styles/Settings/Size/Size.module.css';
import globalStyles from '../../styles/Settings/Settings.module.css';
import { Form } from "react-bootstrap";

interface Props {
  size: string,
  setSize: Function
}

const Size: React.FC<Props> = ({ size, setSize }) => {
  const sizeChoices = ["Small", "Medium", "Large"];

  const checkIfChecked = (choice: string): boolean => {
    return choice.toLowerCase() === size.toLowerCase() ? true : false;
  };

  return (
    <div className={globalStyles.settingModuleContainer}>
      <Form.Group className={styles.sizeContainer} controlId="sizes">
        <Form.Label>Clock Size</Form.Label>
        <div className={styles.sizeToggles}>
          {sizeChoices.map((choice) => {
            return (
              <Form.Check
                key={choice}
                type="radio"
                name="sizes"
                value={choice}
                label={choice}
                id={choice + "id"}
                defaultChecked={checkIfChecked(choice)}
                onChange={(e) => setSize(e.target.value)}
              />
            );
          })}
        </div>
      </Form.Group>
    </div >
  );
};

export default Size;