export function sortVisitDates(data, dateToRemove, timeToRemove) {
  const updatedData = data.map((item) => {
    const newItem = { ...item };

    const timeIndex = newItem.time.indexOf(timeToRemove);

    if (newItem.value === dateToRemove && timeIndex !== -1) {
      if (newItem.time.length === 1) {
        return null;
      } else {
        newItem.time = [
          ...newItem.time.slice(0, timeIndex),
          ...newItem.time.slice(timeIndex + 1),
        ];
      }
    }

    return newItem;
  });

  return updatedData.filter(Boolean);
}

export function canDelete(arr) {
  let status = false;
  arr.forEach(({ time }) => {
    if (arr.length === 1 && time.length === 1) {
      status = false;
    } else {
      status = true;
    }
  })

  return status;
}