import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap';
import globalStyles from '../../styles/Settings/Settings.module.css';
import styles from '../../styles/Settings/Quote/Quote.module.css';

type Props = {
  showQuote: boolean,
  setShowQuote: Function
}

const Quote = ({ showQuote, setShowQuote }: Props) => {
  return (
    <div className={styles.quoteContainer}>
      <div className={globalStyles.settingModuleContainer}>
        <Form.Group className={globalStyles.toggle}>
          <Form.Label className={globalStyles.toggleLabel}>Show motivational quote</Form.Label>
          <Form.Check
            type="switch"
            id="custom-switch"
            checked={showQuote}
            onChange={(e) => setShowQuote(!showQuote)}
            className={styles.toggle}
          />
        </Form.Group>
      </div>
    </div>
  )
}

export default Quote