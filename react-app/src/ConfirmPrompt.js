import React from 'react';
import Button from './Button';
import './ConfirmPrompt.css';

function ConfirmPrompt({ title, confirmAction, cancelAction, dispatch, children }) {
  return (
    <div className="ConfirmPrompt">
      <div className="ConfirmPrompt-overlay"></div>
      <div className="ConfirmPrompt-box">
        <div className="ConfirmPrompt-header">{title}</div>
        <div className="ConfirmPrompt-body">{children}</div>
        <div className="ConfirmPrompt-footer">
          <Button action={cancelAction} dispatch={dispatch}>Cancel</Button>
          <Button action={confirmAction} dispatch={dispatch}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPrompt;
