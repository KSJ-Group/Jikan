import React from 'react';
import { Form, Button } from 'react-bootstrap';

const AutoStartBreak = () => {
  return (
    <div>
      <Form.Group>
        <Form.Label></Form.Label>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Auto-start break"
        />
      </Form.Group>
    </div>

  );
};

export default AutoStartBreak;