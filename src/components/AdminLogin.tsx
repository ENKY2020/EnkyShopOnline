const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  // Correct admin email and password
  const adminEmail = 'mugendievans10@gmail.com';
  const adminPassword = 'RICH2024!';

  if (email === adminEmail && password === adminPassword) {
    // Proceed with the login flow
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      setError('Invalid credentials. Please try again.');
    } else {
      onLogin();
    }
  } else {
    setError('Invalid admin credentials.');
  }

  setIsLoading(false);
};

