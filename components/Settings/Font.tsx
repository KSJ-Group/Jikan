import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "../../styles/Settings/Settings.module.css";

interface Props {
  selectedFont: string;
  setSelectedFont: Function;
}

const Font: React.FC<Props> = ({ selectedFont, setSelectedFont }) => {
  const changeFont = (e: any) => {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    setSelectedFont(target.value);
  };

  const fonts = ["Courier", "Monaco", "Tahoma", "Trebuchet MS", "Verdana"];
  const [availFonts, setFonts] = useState<string[]>(fonts);

  return (
    <div>
      <Form.Group className={styles.font}>
        <Form.Label>Time Font</Form.Label>
        <Form.Select
          defaultValue={selectedFont}
          onChange={(e) => changeFont(e)}
        >
          {availFonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default Font;
