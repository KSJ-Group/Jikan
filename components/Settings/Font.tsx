import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import globalStyles from "../../styles/Settings/Settings.module.css";
import styles from "../../styles/Settings/Font/Font.module.css";
import styled from "styled-components";

interface Font {
  font: any;
}

const StyledFont = styled.option<Font>`
    font-family: ${(props) => props.font}, monospace;
`

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

  const fonts = ["Andale Mono", "Courier New", "Monaco", "Nova Mono", "Share Tech Mono", "Syne Mono", "Tahoma", "Trebuchet MS", "Verdana", "Xanh Mono"];
  const [availFonts, setFonts] = useState<string[]>(fonts);

  return (
    <div className={globalStyles.settingModuleContainer}>
      <div className={styles.fontContainer}>
        <Form.Group className={globalStyles.font}>
          <Form.Label>Font</Form.Label>
          <Form.Select
            value={selectedFont}
            onChange={(e) => changeFont(e)}
          >
            {availFonts.map((font) => (
              <StyledFont key={font} value={font} font={font}>
                {font}
              </StyledFont>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
    </div>
  );
};

export default Font;
