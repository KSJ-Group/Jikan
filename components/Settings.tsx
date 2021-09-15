import React, { useState, useEffect } from 'react';
import { Offcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody } from 'react-bootstrap';

interface Props {
  settings: boolean,
  setSettings: any
};

const Settings: React.FC<Props> = ( {settings, setSettings} ) => {

  const handleClose = () => setSettings(false);

  
  return (
    <>
      <Offcanvas show={settings} onHide={handleClose}>
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

