export async function createBooking(token, gym_id, with_balance, lines, total_price = '0', anti_frod = {uuid: ''}) {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ gym_id, with_balance, lines, total_price, anti_frod}),
    });
  
    const response = await result.json()
    if (!response.error) {
      return response;
    } else {
      return response
    }
  } catch(error) {
    return { error: true }
  }
}

export const combinedList = (list) => {
  const priceCounts = {};

  list.forEach(({ time}, id) => {
    time.forEach((training, index) => {
      const price = index + id === 0 ? training.price.first : training.price.default;
      priceCounts[price] = (priceCounts[price] || 0) + 1;
    });
  });

  return Object.entries(priceCounts).map(([price, count]) => ({
    price: Number(price),
    count,
  }));
}

export function prepareDataForBooking(data) {
  const result = {};

  data.forEach(({ value, time }) => {
    const date = new Date(value);
    // const localDate = date.toLocaleDateString("en-CA");
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const localDate = `${year}-${month}-${day}`;

    const times = time.map(({ time }) => time);

    if (!result[localDate]) {
      result[localDate] = times;
    } else {
      result[localDate] = [...result[localDate], ...times];
    }
  });

  return result;
}

export const separation = (balance, list) => {
  const paidTrainings = [];
  const unpaidTrainings = [];

  let remainingBalance = balance;

  list.forEach(({ value, time }, id) => {
    const paidTime = [];
    const unpaidTime = [];

    time.forEach((session, i) => {
      const price = id+i==0 ? session.price.first : session.price.default;

      const sessionWithPrice = { ...session, price }; // Заменяем price объект на значение

      if (remainingBalance > 0) {
        paidTime.push(sessionWithPrice);
        remainingBalance--;
      } else {
        unpaidTime.push(sessionWithPrice);
      }
    });

    if (paidTime.length > 0) {
      paidTrainings.push({ value, time: paidTime });
    }
    if (unpaidTime.length > 0) {
      unpaidTrainings.push({ value, time: unpaidTime });
    }
  });

  const paid = aggregateByPrice(paidTrainings);
  const not_paid = aggregateByPrice(unpaidTrainings);

  return { paid, not_paid };
}

function aggregateByPrice(trainings) {
  const priceMap = {};

  trainings.forEach(({ time }) => {
    time.forEach(({ price }) => {
      if (priceMap[price]) {
        priceMap[price]++;
      } else {
        priceMap[price] = 1;
      }
    });
  });

  return Object.entries(priceMap).map(([price, count]) => ({
    price: Number(price),
    count
  }));
}