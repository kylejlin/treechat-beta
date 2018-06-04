import React from 'react';
import './Button.css';

function Button({ action, dispatch, disabled, children }) {
  return (
    <div className={disabled ? 'Button Button-disabled': 'Button'} onClick={(e) => {dispatch(action)}}>{children}</div>
  );
}

export default Button;
