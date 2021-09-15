import React, { useState, useEffect } from 'react';
import { Offcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody } from 'react-bootstrap';

interface Props {
  showSettings: boolean,
  setShowSettings: any
};

const Settings: React.FC<Props> = ( {showSettings, setShowSettings} ) => {

  const handleClose = () => setShowSettings(false);


  return (
    <>
      <Offcanvas show={showSettings} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


export default Settings;

