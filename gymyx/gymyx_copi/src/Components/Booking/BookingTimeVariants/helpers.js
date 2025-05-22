

export function convertToTimeFormat(number) {
  if (typeof number !== "number" || number < 0 || number > 23.99) {
    throw new Error("Invalid input. Provide a number between 0 and 23.99.")
  }

  const hours = Math.floor(number)
  const minutes = Math.round((number % 1) * 60)

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`

  return `${formattedHours}:${formattedMinutes}`
}

export const timeToNumber = (value) => {
  return Math.round(value?.slice(0, 2))
}
