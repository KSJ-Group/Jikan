import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import styles from '../../styles/Settings/Settings.module.css';

const Font = () => {
  return (
    <div>
      <Form.Group>
        <Form.Label>Font</Form.Label>
        <Form.Select>
          <option value='' hidden></option>
          <option value='Arial'>Arial</option>
          <option value='TimeNewSeiji'>TimeNewSeiji</option>
          <option value='RandomFont'>RandomFont</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default Font;