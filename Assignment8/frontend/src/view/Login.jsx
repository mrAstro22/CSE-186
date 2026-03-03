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
      Meowl Chat - Where you Chat With Meowls
      <p>
        <input type="text"
          aria-label = "user-box"
          className = "user-box"
          placeholder="Username"
          ref={usernameRef}
        />
      </p>
      <p>
        <input type="password"
          aria-label = "password-box"
          className = "password-box"
          placeholder="Password"
          ref={passwordRef} />
      </p>
      <button className = "login-button"
        aria-label = "login-button"
        onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
