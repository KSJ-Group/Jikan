import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "../../styles/Settings/Settings.module.css";

interface Props {
  autoStartBreak: string;
  setAutoStartBreak: Function;
}

const AutoStartBreak: React.FC<Props> = ({
  autoStartBreak,
  setAutoStartBreak,
}) => {
  const choices = ["Off", "Short break", "Long break"];

  const checkIfChecked = (choice: string): boolean => {
    if (choice === autoStartBreak) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Form.Group className={styles.autoStart}>
        <Form.Label>Auto-start breaks</Form.Label>
        <div className={styles.toggles}>
          {choices.map((choice) => {
            return (
              <Form.Check
                key={choice}
                type="radio"
                name="name"
                value={choice}
                label={choice}
                id={choice + "id"}
                defaultChecked={checkIfChecked(choice)}
                onChange={(e) => setAutoStartBreak(e.target.value)}
              />
            );
          })}
          {/* <Form.Check
            type="radio"
            id="default-radio"
            value="None"
            label="None"
            onChange={(e) => setAutoStartBreak(e.target.value)}
          />
          <Form.Check
            type="radio"
            id="default-radio"
            value="Short break"
            label="Short break"
            onChange={(e) => setAutoStartBreak(e.target.value)}
          />
          <Form.Check
            type="radio"
            id="default-radio"
            value="Long break"
            label="Long break"
            onChange={(e) => setAutoStartBreak(e.target.value)}
          /> */}
        </div>
      </Form.Group>
    </div>
  );
};

export default AutoStartBreak;
