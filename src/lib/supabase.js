import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co'; // Replace with your actual URL
const supabaseKey = process.env.VITE_SUPABASE_KEY; // Ensure the key is set correctly

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };

