import React, { useContext } from "react";
import globalStyles from '../../styles/Settings/Settings.module.css';
import { Form } from "react-bootstrap";
import { SettingsContext } from '../SettingsContext';
import styles from '../../styles/Settings/Ambiances/Ambiances.module.css';

const Ambiance = () => {
  const { currentAmbiance, setCurrentAmbiance } = useContext(SettingsContext);
  const ambiances = ["None", "Rain"];

  const changeAmbiance = (e: any) => {
    e.preventDefault();
    setCurrentAmbiance(e.target.value);
  }

  return (
    <div className={globalStyles.settingModuleContainer}>
      <div className={styles.ambiancesContainer}>
        <Form.Group className={globalStyles.font}>
          <Form.Label>Ambiance</Form.Label>
          <Form.Select
            value={currentAmbiance}
            onChange={(e) => changeAmbiance(e)}
          >
            {ambiances.map((ambiance) => (
              <option key={ambiance}>
                {ambiance}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
    </div>
  );
};

export default Ambiance;