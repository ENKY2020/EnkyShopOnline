import { useState } from 'react';
import { supabase } from '../lib/supabase'; // Import Supabase client

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Sign up with Supabase
      const { user, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;

      // Insert user data into Supabase table (you need to create a 'users' table)
      await supabase.from('users').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        created_at: new Date().toISOString()
      }]);

      // Redirect after successful signup
      window.location.href = '/login'; // Redirect to login page
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields for email, password, name, phone, etc. */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </div>
  );
}

