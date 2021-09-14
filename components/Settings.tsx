import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { Offcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody } from 'react-bootstrap';

const Settings: NextPage = ( {settings, setSettings} ) => {

  const handleClose = () => setSettings(false);

  return (
    <>
      <Offcanvas settings={settings} onHide={handleClose}>
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

