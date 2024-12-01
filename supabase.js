import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL; // Make sure you add this in your .env file
const supabaseKey = process.env.SUPABASE_KEY; // Add this in your .env file as well

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };

