import React from 'react';

function Login({
  existingUserLoginInputs: { username, password, handleUsernameChange, handlePasswordChange },
  createUserFormInputs: { newUsername, newPassword, handleNewUsernameChange, handleNewPasswordChange },
  handleLogin,
  handleNewUserCreation
}) {
  return (
    <ul>
      <li><h2>Existing Users:</h2></li>
      <li>
        <ul>
          <li><h3>Username</h3></li>
          <li>
            <input type="text" value={username} onChange={handleUsernameChange} />
          </li>
          <li><h3>Password</h3></li>
          <li>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </li>
          <li><button onClick={handleLogin}>Log in</button></li>
        </ul>
      </li>

      <li><h2>Create a user</h2></li>
      <li>
        <ul>
          <li><h3>Choose a username (/[a-zA-Z0-9]/ only)</h3></li>
          <li><input type="text" value={newUsername} onChange={handleNewUsernameChange} /></li>
          <li><h3>Choose a password</h3></li>
          <li><input type="password" value={newPassword} onChange={handleNewPasswordChange} /></li>
          <li><button onClick={handleNewUserCreation}>Create</button></li>
        </ul>
      </li>
    </ul>
  );
}

export default Login;
