import { useState } from 'react';
import { supabase } from '../lib/supabase'; // Import the Supabase client

export default function AdminLogin() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email: emailInput,
        password: passwordInput,
      });
      if (error) {
        setError('Login failed: ' + error.message);
        console.error('Login error:', error);
      } else {
        console.log('Logged in user:', user);
        // Redirect to dashboard or other page
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

