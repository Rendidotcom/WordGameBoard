// frontend/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// GANTI dengan milikmu dari Supabase Project Settings
const supabaseUrl = 'https://tkckumxywpobbnklyhit.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrY2t1bXh5d3BvYmJua2x5aGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxOTg2MDAsImV4cCI6MjA2MDc3NDYwMH0.DjRa4HdiRwLqbeKEpWrNCgKDqS9iV1sKeA7q0G0n4VI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
