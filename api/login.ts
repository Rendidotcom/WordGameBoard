// login.ts
import { supabase } from './supabaseClient';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { email, password } = await req.json();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ user: data.user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Login error:', err);
    return new Response(JSON.stringify({ message: 'A server error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
