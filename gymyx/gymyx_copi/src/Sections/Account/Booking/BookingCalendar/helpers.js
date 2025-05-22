const getAvailableDates = async (token, gym, month, year) => {
  const result = await fetch('/api/booking/get-avaliable-dates', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token, gym, month, year }),
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
};
export const takeAvailableDatesTwoMonth = async (token, gym_id) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const fetchCurrentMonthDates = getAvailableDates(token, gym_id, currentMonth, currentYear);
  const fetchNextMonthDates = getAvailableDates(token, gym_id, currentMonth + 1, currentYear);
  return Promise.all([fetchCurrentMonthDates, fetchNextMonthDates])
    .then(([currentMonthData, nextMonthData]) => {
      const combinedDates = [...currentMonthData?.data, ...nextMonthData?.data];

      if (combinedDates.length > 0) {
        const dates = combinedDates.map((dateString) => new Date(dateString));
        return dates;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error('Error fetching available dates for both months:', error);
      throw error;
    });
};

export function compareDates(a, b) {
  return new Date(a.value) - new Date(b.value);
}