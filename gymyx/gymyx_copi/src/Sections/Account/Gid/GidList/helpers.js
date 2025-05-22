export async function addFavoriteExerciser(token, exerciser) {
  const result = await fetch('/api/gids/add-favorite', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, exerciser }),
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
}

export async function deleteFavoriteExerciser(token, exerciser) {
  const result = await fetch('/api/gids/delete-favorite', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, exerciser }),
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
}

export async function addWatchedExerciser(token, exerciser) {
  const result = await fetch('/api/gids/add-watched', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, exerciser }),
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
}
