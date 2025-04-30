export const config = {
  runtime: 'edge',
};

import { supabase } from './supabaseClient';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();

    if (!body.email || !body.password) {
      return new Response(JSON.stringify({ message: 'Email dan password diperlukan.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { email, password } = body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      return new Response(JSON.stringify({ message: error?.message || 'Login gagal.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ user: data.user, username: data.user.email }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return new Response(JSON.stringify({ message: 'Server error: ' + err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
