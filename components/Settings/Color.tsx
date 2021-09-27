import React, { useContext } from 'react';
import { ChromePicker } from 'react-color';
import { BackgroundContext } from '../BackgroundContext';

const Color = () => {
  const { background, changeBackground } = useContext(BackgroundContext);

  return (
    <div>
      <ChromePicker color={background} onChange={(color) => {changeBackground(color.hex)}}/>
    </div>
  );
};

export default Color;
