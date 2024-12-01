import { useState } from 'react';
import { supabase } from '../lib/supabase'; // Use Supabase client

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Login with Supabase
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password
      });

      if (error) throw error;

      // Call onLogin if successful
      onLogin();
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit}>
        {/* Form for email and password */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

