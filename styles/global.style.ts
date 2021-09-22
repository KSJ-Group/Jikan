import styled from 'styled-components';

interface Props {
  brightness: any;
}

export const BrightnessDiv = styled.div<Props>`
  height: 100vh;
  width: 100vw;
  filter: brightness(${props => props.brightness})
`;