import React from 'react';

const Button = ({ btn, id, handleButtonInput }) => {
  return (
    <button type='button' id={id} onClick={() => handleButtonInput(btn)}>
      {btn === 'd' ? <i className='fas fa-backspace    '></i> : btn}
    </button>
  );
};

export default Button;
