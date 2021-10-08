import React, { useState, useEffect } from 'react';
import Color from './Color';
import Search from './Search';
import Options from './Options';

const ChangeBackground: React.FC = () => {
  const [display, setDisplay] = useState<string>('');

  const changeDisplay = (option: string) => {
    setDisplay(option);
  };

  const openDisplay = () => {
    if (display === 'image') {
      return <Search />
    } else if (display === 'color') {
      return <Color />
    } else return null;
  };

  return (
    <div>
      <Options changeDisplay={changeDisplay}/>
      {openDisplay()}
    </div>
  );
};

export default ChangeBackground;