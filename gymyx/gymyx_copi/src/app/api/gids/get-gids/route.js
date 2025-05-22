export const dynamic = 'force-dynamic';
export async function POST(request) {
  if (request.method === 'POST') {
    try {
      const requestData = await request.json();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercisers`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${requestData.token}`,
        },
      });

      if (!response.ok) {
        return Response.json({ error: 'Произошла ошибка, попробуйте позже!' });
      }
      const result = await response.json();
      return Response.json({ data: result });
    } catch (error) {
      return Response.json({ error: 'Error fetching data' });
    }
  } else {
    request.status(405).end();
  }
}
