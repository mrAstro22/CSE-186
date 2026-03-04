import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import {loginContext} from '../App';


/**
 * @returns login page
 */
function Login() {
  // const [error, setError] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorCode, setError] = useState('');
  const navigate = useNavigate();

  // // WebSocket
  // const connectSocket = (token) => {
  //   if (wsRef.current) {
  //     wsRef.current.close(); // close previous WS
  //   }

  //   const ws = new WebSocket('ws://localhost:3010');
  //   ws.onopen = () => {
  //     console.log('WebSocket connected');
  //     setWsStatus('connected');
  //   };

  //   ws.onerror = (error) => {
  //     console.log('WebSocket Error');
  //     setError('WebSocket error', error.message);
  //   };

  //   ws.onclose = () => {
  //     setError('WebSocket disconnected, refresh the page when ready.');
  //   };
  //   return () => {
  //     ws.close();
  //   };
  // };

  // Check Credentials
  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log([email, password]);

    // Check Database
    const res = await fetch('http://localhost:3010/api/v0/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    });

    // Get User Metadata
    const data = await res.json();

    if (res.ok) {
      console.log('Login success:', data);
      localStorage.setItem('accessToken', data.accessToken);
      setError('Login Success');

      // Success, go to next page
      navigate('/home');
      // connectSocket(data.accessToken);
    } else {
      console.error('Login Failed', data.error);
      setError(`Login Failed ${data.error}`);
    }
    // if (username && password) {
    //   setLogin(true);          // update context
    //   navigate('/home');       // redirect to home page
    // }
  };

  return (
    <div>
      <p>
        <input type="text"
          aria-label = "user-box"
          className = "user-box"
          placeholder="Username"
          ref={emailRef}
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
      <p/>
      {errorCode && <p className="error">{errorCode}</p>}
    </div>
  );
}

export default Login;
