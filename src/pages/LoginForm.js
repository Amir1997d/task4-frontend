import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checkStatus  from '../handlers/checkStatus';
import { logSubmitting } from '../handlers/submitHandlers';
import Style from '../styles/style.css'

const LoginForm = ({ setCurrentUser }) => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userStatus = await checkStatus(username);
      console.log(userStatus);
      if (userStatus === "active") {
        logSubmitting(e, navigate, setCurrentUser, setError, username, password);
      } else if (userStatus === "blocked") {
        navigate('/blocked-user');
      } else {
        navigate('/register');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
