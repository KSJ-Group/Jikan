import React, { useState, useEffect } from 'react';
import { Offcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap'
import styles from '../styles/Settings.module.css';

interface Props {
  showSettings: boolean,
  setShowSettings: any
}


const Settings: React.FC<Props> = ({ showSettings, setShowSettings }) => {



  return (
    <>
      <Offcanvas show={showSettings} onHide={() => setShowSettings(false)} placement='end'>
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            Clock Settings
            <div>Brightness</div>
          </div>

          <div>
            <Form >
              <div className={styles.form}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Pomodoro</Form.Label>
                  <Form.Control type="pomodoro" className={styles.pomodoro} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Short Break</Form.Label>
                  <Form.Control type="shortbreak" className={styles.shortbreak} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Long Break</Form.Label>
                  <Form.Control type="longbreak" className={styles.longbreak} />
                </Form.Group>
              </div>
              <Form.Group>
                <Form.Label>check this out yo</Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="you do u seiji"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Alert Sound</Form.Label>
                <Form.Select>
                  <option value='' hidden></option>
                  <option value='Classic beep'>Classic beep</option>
                  <option value='Classic Seiji'>Classic Seiji</option>
                  <option value='Classic June'>Classic June</option>
                  <option value='Classic Katie'>Classic Katie</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>Font</Form.Label>
                <Form.Select>
                  <option value='' hidden></option>
                  <option value='Arial'>Arial</option>
                  <option value='TimeNewSeiji'>TimeNewSeiji</option>
                  <option value='RandomFont'>RandomFont</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>



          <div>
            Alarm Sound
          </div>

          <div>
            Font
          </div>

          <div>
            Show seconds
          </div>

          <div>
            Blur
          </div>

          <div>
            12 hours
          </div>

          <div>
            24 hours
          </div>

          <div>
            Background Image
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


export default Settings;

