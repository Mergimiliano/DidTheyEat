import './App.css';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Access Token:', data.access);
    } else {
      console.error('Login failed:', response.statusText);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Username: <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div>
        Password: <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div>
        <input type='submit' value='Login' />
      </div>
    </form>
  );
}

export default App;
