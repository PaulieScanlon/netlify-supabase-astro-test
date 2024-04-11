import { Client } from 'https://deno.land/x/postgres/mod.ts';

export default async function handler() {
  const client = new Client({
    user: Netlify.env.get('SUPABASE_USER'),
    password: Netlify.env.get('SUPABASE_PASSWORD'),
    hostname: Netlify.env.get('SUPABASE_HOSTNAME'),
    database: 'postgres',
    port: 5432,
  });
  await client.connect();

  try {
    const result = await client.queryArray('SELECT * FROM users');

    return new Response(JSON.stringify({ message: 'A-Ok!', data: result.rows }, null, 2), {
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

export const config = { path: '/ef-get-all-users' };
