import styled, { createGlobalStyle } from 'styled-components';

interface Props {
  brightness: any
}

interface Background {
  blur: any
}

interface Font {
  font: any
}

interface BackgroundColor {
  color: any
}

export const BrightnessDiv = styled.div<Props>`
  height: 100vh;
  width: 100vw;
  filter: brightness(${props => props.brightness});
`;

export const BackgroundBlur = styled.div<Background>`
  filter: blur(${props => props.blur || '0'});
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  transition: 0.6s ease-in-out;
`;

export const ClockFont = styled.div<Font>`
  font-family: ${props => props.font}, monospace;
`;

export const BackgroundColor = createGlobalStyle<BackgroundColor>`
  body {
    background: ${props => props.color};
  }
`