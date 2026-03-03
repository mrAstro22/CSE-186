import {useRef} from 'react';

/**
 *
 */
function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    // if (username && password) {
    //   setLogin(true);          // update context
    //   navigate('/home');       // redirect to home page
    // }
    console.log([username, password]); // store in array, send to API, etc.
  };

  return (
    <div>
      <p>
        <input type="text"
          className = "user-box"
          placeholder="Username"
          ref={usernameRef}
        />
      </p>
      <p>
        <input type="password"
          className = "password-box"
          placeholder="Password"
          ref={passwordRef} />
      </p>
      <button className = "login-button"
        onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
