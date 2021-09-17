import React, { useState, useEffect } from 'react';

const Brightness = () => {
  const [brightness, setBrightness] = useState<number>(50)

  const changeHandler = (e: any): void => {
    e.preventDefault();
    setBrightness(e.target.value);
  }

  return (
    <div>
      Brightness
      <div>
        <input onChange={changeHandler} type="range" className="brightness" name="volume"
          min="0" max="100" />
      </div>
    </div>
  );
};

export default Brightness;