export const getPackages = async (token) => {
  const result = await fetch('/api/package/get-all-packages', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token})
  });

    const response = await result.json();
    if (!response.error) {
      return response;
    }
};

export const buyPackage = async (token, package_id, split = false) => {
  const result = await fetch('/api/package/buy-package', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token, package_id, split})
  });

    const response = await result.json();
    if (!response.error) {
      return response;
    }
};