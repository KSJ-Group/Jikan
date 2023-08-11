import styled, { createGlobalStyle } from "styled-components";

interface Props {
  brightness: number;
}

interface BackgroundColor {
  color: any;
}

export const BrightnessDiv = styled.div<Props>`
  height: 100vh;
  width: 100vw;
  filter: brightness(${(props) => props.brightness + "%"});
`;

export const BackgroundWrapper = styled.div<{ blur: number }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(${(props) => props.blur + "px"});
  filter: blur(${(props) => props.blur + "px"});
`;

export const BackgroundColor = createGlobalStyle<BackgroundColor>`
  body {
    background: ${(props) => props.color};
  }
`;
