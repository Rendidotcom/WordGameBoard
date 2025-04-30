import { supabase } from './supabaseClient';

export default async function handler(req: Request): Promise<Response> {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ email: user.email }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
