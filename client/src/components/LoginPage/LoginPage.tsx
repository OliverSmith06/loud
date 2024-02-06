import { webPass, webUser } from '@/secrets/webAuth';
import React, { useEffect, useState } from 'react';

interface LoginProps {
    onLogin: any;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
      if (typeof window !== 'undefined') {
        onLogin(JSON.parse(localStorage.getItem('loggedIn') || 'false'))
      }
    }, []);
  
    const handleLogin = () => {
      if (username === webUser && password === webPass) {
        onLogin(true);
      } else {
        setError('Invalid username or password');
      }
    };
  
    return (
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          style={{color: 'black'}}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={{color: 'black'}}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p>{error}</p>}
      </div>
    );
  };

export default LoginPage