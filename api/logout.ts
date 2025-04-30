import { supabase } from './supabaseClient';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ message: 'Logged out' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
