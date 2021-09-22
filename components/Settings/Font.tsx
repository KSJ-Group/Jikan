import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import styles from '../../styles/Settings/Settings.module.css';

interface Props {
  selectedFont: string,
  setSelectedFont: Function
}

const Font: React.FC<Props> = ( { selectedFont, setSelectedFont } ) => {

  const changeFont = (e: any) => {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    setSelectedFont(target.value);
  }

  return (
    <div>
      <Form.Group className={styles.font}>
        <Form.Label>Font</Form.Label>
        <Form.Select defaultValue={selectedFont} onChange={(e) => changeFont(e)}>
          <option value='' hidden></option>
          <option value={selectedFont}>{selectedFont}</option>
          <option value='Arial'>Arial</option>
          <option value='TimeNewSeiji'>TimeNewSeiji</option>
          <option value='RandomFont'>RandomFont</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default Font;