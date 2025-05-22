export const getAllTags = (data) => {
  let SetTag = new Set()
  data.forEach(item => item.tags.forEach(tag => SetTag.add(tag.name)))
  return Array.from(SetTag)
}

export const sortByFavorites = (arr) => {
  return arr.sort((a, b) => (b?.isFavorited ? 1 : -1) - (a?.isFavorited ? 1 : -1)) || arr
}

export const getGids = async (token) => {
  const result = await fetch('/api/gids/get-gids', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
};