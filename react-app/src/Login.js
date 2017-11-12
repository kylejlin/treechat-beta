import React from 'react';
import create from './actionCreator';

function Login({
  state,
  dispatch
}) {
  return (
    <ul>
      <li><h2>Existing Users:</h2></li>
      <li>
        <ul>
          <li><h3>Username</h3></li>
          <li>
            <input
              type="text"
              value={state.ui.login.username}
              onChange={(e) => dispatch(create.editLoginUsername(e.target.value))}
            />
          </li>
          <li><h3>Password</h3></li>
          <li>
            <input
              type="password"
              value={state.ui.login.password}
              onChange={(e) => dispatch(create.editLoginPassword(e.target.value))}
            />
          </li>
          <li><button onClick={() => dispatch(create.login())}>Log in</button></li>
        </ul>
      </li>

      <li><h2>Create a user</h2></li>
      <li>
        <ul>
          <li><h3>Choose a username (/[a-zA-Z0-9]/ only)</h3></li>
          <li><input
            type="text"
            value={state.ui.signUp.username}
            onChange={(e) => dispatch(create.editNewUsername(e.target.value))}
          /></li>
          <li><h3>Choose a password</h3></li>
          <li><input
            type="password"
            value={state.ui.signUp.password}
            onChange={(e) => dispatch(create.editNewPassword(e.target.value))}
          /></li>
          <li><button onClick={() => dispatch(create.signUp())}>Create</button></li>
        </ul>
      </li>
    </ul>
  );
}

export default Login;
