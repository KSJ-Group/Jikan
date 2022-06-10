import React from 'react';
import globalStyles from '../../styles/Settings/Settings.module.css'

const Reset = () => {
  const reset = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    location.reload();
  }
  return (
    <button className={globalStyles.settingModuleContainer} onClick={(e: any) => reset(e)}>
      Reset All Options
    </button>
  );
};

export default Reset;