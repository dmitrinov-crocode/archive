export const dynamic = 'force-dynamic'; // defaults to force-static
export async function POST(request) {
  if (request.method === 'POST') {
    try {
      const requestData = await request.json();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: requestData.phone, code: requestData.code }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result?.message === 'Unauthorized') {
          return Response.json({ error: 'Unauthorized' });
        }
        return Response.json({ error: 'Network response was not ok' });
      }

      return Response.json({ data: result?.data });
    } catch (error) {
      return Response.json({ error: 'Error fetching data' });
    }
  } else {
    request.status(405).end();
  }
}
