import React, { useState } from 'react';
import globalStyles from '../../styles/Settings/Settings.module.css'
import styled from 'styled-components';
import AreYouSureResetModal from '../AreYouSureResetModal';

const Button = styled.button<{ onClick: Function }>`
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

  const openModal = (e: any) => {
    e.preventDefault();
    setShowConfirm(true);
  }

  return (
    <div className={globalStyles.settingModuleContainer}>
      <Button onClick={(e: any) => openModal(e)}>
        Reset All Options
      </Button>
      <AreYouSureResetModal show={showConfirm} setShowConfirm={setShowConfirm} />
    </div>
  );
};

export default Reset;