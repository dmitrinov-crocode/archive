export const getTrainingData = async (token) => {
  const result = await fetch('/api/booking/get-bookings', {
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

export async function cancelBooking(token, id) {
  const result = await fetch('/api/booking/cancel-booking', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, id }),
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
}

export function canDelete(arr) {
  let status = false;
  arr.forEach(({ time }) => {
    if (arr.length === 1 && time.length === 1) {
      status = false;
    } else {
      status = true;
    }
  });

  return status;
}
