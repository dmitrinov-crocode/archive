export async function changeSubscribe(token, subscribe) {
  const result = await fetch('/api/profile/change-subscribe', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, subscribe }),
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
}

export async function deleteSubscribe(token, subscribe) {
  const result = await fetch('/api/profile/delete-subscribe', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, subscribe }),
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
}
