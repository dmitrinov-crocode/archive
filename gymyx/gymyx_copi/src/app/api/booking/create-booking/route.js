export const dynamic = 'force-dynamic'; // defaults to force-static
export async function POST(request) {
  if (request.method === 'POST') {
    try {
      const requestData = await request.json();

      const requestBody = {
        gym_id: requestData.gym_id,
        with_balance: requestData.with_balance,
        lines: requestData.lines,
        anti_frod: requestData.anti_frod
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${requestData.token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return Response.json({ data });
    } catch (error) {
      return Response.json({ error: 'Error fetching data' });
    }
  } else {
    request.status(405).end();
  }
}
