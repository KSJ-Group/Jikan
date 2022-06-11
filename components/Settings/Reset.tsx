import React, { useState } from 'react';
import globalStyles from '../../styles/Settings/Settings.module.css'
import styled from 'styled-components';

const Button = styled.button`
  font-size: 12px;
  padding: 10px;
  border-radius: 5px;
  background-color: #efefef;
  border: 0.1px solid rgb(168, 168, 168);
  transition: 0.3s ease-in-out;
  &:hover {
    background: #dddddd;
  }
`
const Reset = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const areYouSure = (e: any) => {
    e.preventDefault();
    setShowConfirm(true);
  }

  const clickReset = (e: any) => {
    setTimeout(() => {
      localStorage.clear();
      location.reload();
    }, 1000);
  }

  return (
    <div className={globalStyles.settingModuleContainer}>
      {showConfirm ?
        <Button onClick={(e: any) => clickReset(e)}>Are you sure?</Button> :
        <Button onClick={(e: any) => areYouSure(e)}>
          Reset All Options
        </Button>
      }

    </div>
  );
};

export default Reset;