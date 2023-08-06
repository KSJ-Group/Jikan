import React, { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import styles from "../../styles/Settings/Timers/Timers.module.css";
import globalStyles from "../../styles/Settings/Settings.module.css";
import {
  minutesAndSecondsToMillis,
  millisToMinutesAndSeconds,
} from "../../helper/convertTime";
import { SettingsContext } from "../../contexts/SettingsContext";

interface Props {
  pomodoroTime: number;
  breakTime: number;
  setPomodoroTime: Function;
  setBreakTime: Function;
  setShowSettings: Function;
}

const Timers: React.FC<Props> = ({
  pomodoroTime,
  breakTime,
  setPomodoroTime,
  setBreakTime,
  setShowSettings,
}) => {
  const [pomStr, setPomStr] = useState<string>(
    millisToMinutesAndSeconds(pomodoroTime)
  );
  const [shortStr, setShortStr] = useState<string>(
    millisToMinutesAndSeconds(breakTime)
  );
  const [currentPom, setCurrentPom] = useState<number>(25);
  const [currentShort, setCurrentShort] = useState<number>(5);

  const [minutes, setMinutes] = useState<number[]>([]);
  const [shortMinutes, setShortMinutes] = useState<number[]>([]);

  const { setAutoStartBreak, autoStartBreak } = useContext(SettingsContext);
  useEffect(() => {
    for (let i = 1; i <= 120; i++) {
      setMinutes((prev) => [...prev, i]);
      if (i <= 30) {
        setShortMinutes((prev) => [...prev, i]);
      }
    }
    setCurrentPom(parseInt(millisToMinutesAndSeconds(pomodoroTime)));
    setCurrentShort(parseInt(millisToMinutesAndSeconds(breakTime)));
  }, []);

  useEffect(() => {
    if (pomStr === "0") {
      pomChange("1");
    }
    if (shortStr === "0") {
      setShortStr("1");
    }
  }, [pomStr, shortStr]);

  const pomChange = (e: any): void => {
    if (parseInt(e.target.value) > 0) {
      e.preventDefault();
      let toMs = minutesAndSecondsToMillis(e.target.value);
      setPomodoroTime(toMs);
      setCurrentPom(parseInt(e.target.value));
    }
  };

  const shortChange = (e: any): void => {
    if (parseInt(e.target.value) > 0) {
      e.preventDefault();
      let toMs = minutesAndSecondsToMillis(e.target.value);
      setBreakTime(toMs);
      setCurrentShort(parseInt(e.target.value));
    }
  };

  const resetTimer = (e: any) => {
    setPomodoroTime(1500000);
    setPomStr("25");
    setBreakTime(300000);
    setShortStr("5");
    setShowSettings(false);
  };

  const autoBreakToggle = (e: any) => {
    e.target.checked ? setAutoStartBreak(true) : setAutoStartBreak(false);
  }

  return (
    <div className={globalStyles.settingModuleContainer}>
      <div className={styles.timersConatiner}>
        <Form.Group controlId="formPomodoroTimer" className={styles.pomodoro}>
          <Form.Label className={styles.timerLabel}>Pomodoro</Form.Label>
          <Form.Select value={currentPom} onChange={(e) => pomChange(e)}>
            {minutes.map((minute, i) => (
              <option key={minute + i + "pom" + (Math.random() * (1249234 - 1) + 1).toString()} value={minute}>
                {minute}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formShortBreak" className={styles.shortbreak}>
          <Form.Label className={styles.timerLabel}>Break</Form.Label>
          <Form.Select value={currentShort} onChange={(e) => shortChange(e)}>
            {shortMinutes.map((minute, i) => (
              <option key={minute + 'break' + (Math.random() * (1249234 - 1) + 1).toString()} value={minute}>
                {minute}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="autoBreakToggle" className={styles.checkboxWrapper} >
          <Form.Label className={styles.label}>Auto</Form.Label>
          <Form.Check
            type="switch"
            checked={autoStartBreak}
            onChange={(e: any) => autoBreakToggle(e)}
          />
        </Form.Group>

        <button onClick={resetTimer} className={styles.resetBtn}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timers;
