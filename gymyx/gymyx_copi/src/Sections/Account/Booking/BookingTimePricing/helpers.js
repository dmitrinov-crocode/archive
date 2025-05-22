export const prepareVisitDateWithTime = (data, times) => {
    return {
        value: data?.value,
        time: times,
    }
}

export const checkData = (data) => {
    let status = true
    data.forEach(({ time, value }) => {
        if (!time?.length || !value) {
            status = false
            return
        }
    })

    return status
}

export const transferTraining = async (token, line, date, time) => {
  const result = await fetch('/api/booking/transfer-training', {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token, line, date, time }),
  });

    const response = await result.json();
    return response;
};

export const takeAvaliableTimesToLine = async (token, line, date, time) => {
  const fetchCurrentDayTimes = transferTraining(token, line, date, time);

  return fetchCurrentDayTimes.then(({ data }) => data);
};