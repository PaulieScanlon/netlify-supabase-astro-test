import { createClient } from '@supabase/supabase-js';

const supabase = createClient(Netlify.env.get('SUPABASE_URL'), Netlify.env.get('SUPABASE_ANON_KEY'));

export default async function handler() {
  try {
    const response = await supabase.from('users').select();
    return new Response(JSON.stringify({ message: 'A-Ok!', data: response.data }, null, 2), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    return new Response({
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

export const config = { path: '/sf-get-all-users' };
