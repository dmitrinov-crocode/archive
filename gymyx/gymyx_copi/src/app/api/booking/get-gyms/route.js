export const dynamic = 'force-dynamic'; // defaults to force-static
export async function POST(request) {
  if (request.method === 'POST') {
    try {
      const token = request.headers.get('authorization');

      if (!token) {
        return new Response(JSON.stringify({ error: 'Token is missing or undefined' }), { status: 400 });
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gyms`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return Response.json({ error: 'Произошла ошибка, попробуйте позже!' });
      }
      const result = await response.json();
      return Response.json({ data: result.data });
    } catch (error) {
      return Response.json({ error: 'Error fetching data 2' });
    }
  } else {
    request.status(405).end();
  }
}
