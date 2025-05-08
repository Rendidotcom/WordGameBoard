// GANTI import ini:
// import { createClient } from '@supabase/supabase-js';

// DENGAN INI:
import { createClient } from "https://esm.sh/@supabase/supabase-js";

// Buat klien Supabase
const supabaseUrl = 'https://tkckumxywpobbnklyhit.supabase.co'; // Ganti dengan URL project Anda
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrY2t1bXh5d3BvYmJua2x5aGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxOTg2MDAsImV4cCI6MjA2MDc3NDYwMH0.DjRa4HdiRwLqbeKEpWrNCgKDqS9iV1sKeA7q0G0n4VI'; // Ganti dengan anon public key Anda

export const supabase = createClient(supabaseUrl, supabaseKey);
