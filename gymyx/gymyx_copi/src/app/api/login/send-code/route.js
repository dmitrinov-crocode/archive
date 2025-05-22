export const dynamic = 'force-dynamic'; // defaults to force-static
export async function POST(request) {
  if (request.method === 'POST') {
    try {
      const requestData = await request.json();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth`, {
        method: request.method,
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: requestData.phone }),
      });

      if (!response.ok) {
        return Response.json({ error: 'Network response was not ok' });
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
