export function sortVisitDates(data, dateToRemove, timeToRemove) {
  const updatedData = data.filter((item) => {
    if (item.date === dateToRemove && item.time === timeToRemove) {
      return false;
    }

    return true;
  });

  return updatedData;
}

export function prepareDataForBooking(arr) {
  const result = {};

  arr.forEach((item) => {
    const { value, time } = item;

    if (!result[value]) {
      result[value] = [time];
    } else if (!result[value].includes(time)) {
      result[value].push(time);
    }
  });

  return result;
}

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
