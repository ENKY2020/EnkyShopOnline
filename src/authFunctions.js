import supabase from './supabaseClient'; // Import Supabase client

// Function for signing up a new user
export async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Signup error:', error.message);
    return null;
  }
  console.log('Signup successful:', user);
  return user;
}

// Function for logging in an existing user
export async function logIn(email, password) {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login error:', error.message);
    return null;
  }
  console.log('Login successful:', user);
  return user;
}

