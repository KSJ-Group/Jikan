import React, { useState } from 'react';

const Brightness = () => {

  return (
    <div>
      Brightness
      <div>
        <input type="range" id="volume" name="volume"
          min="0" max="100" />
      </div>
    </div>
  );
};

export default Brightness;