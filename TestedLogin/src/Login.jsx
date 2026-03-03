/*
#######################################################################
#
# Copyright (C) 2020-2026 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import React from 'react';

/**
 * @returns {object} JSX Component
 */
function Login() {
  const [credentials, setCredentials] =
    React.useState({email: '', password: ''});
  const [user, setUser] = React.useState(undefined);

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = {...credentials};
    u[name] = value;
    setCredentials(u);
  };

  const logout = () => {
    setUser(undefined);
  };

  const login = (event) => {
    event.preventDefault();
    setUser(undefined);
    fetch('http://localhost:3010/api/v0/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setUser(json);
        })
        .catch((err) => {
          alert('Error logging in, please try again');
        });
  };

  return (
    <div>
      <h2>CSE186 Tested Login</h2>
      <input
        name="email"
        type="email"
        placeholder="EMail"
        onChange={handleInputChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleInputChange}
      />
      <button onClick={login}>Login</button>
      <p/>
      <button disabled={!user} onClick={logout}>Logout</button>
      <p/>
      <label>{user ? user.name : 'Logged out'}</label>
    </div>
  );
}

export default Login;
