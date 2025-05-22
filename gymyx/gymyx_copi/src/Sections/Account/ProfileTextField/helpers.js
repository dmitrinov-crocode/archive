export async function sendMessage(token, text) {
  const result = await fetch('/api/profile/send-message', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, text }),
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
}
