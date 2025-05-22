import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  gym: {},
  visitDate: {
    value: "",
    time: [],
  },
  variant: "",
  currentDate: 0,
  avaliableTimesCurrentDay: [],
  loading: [],
}

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateBookingData: (state, action) => {
      Object.assign(state, action.payload)
    },
    updateBookingVisitDate: (state, action) => {
      state.visitDate = action.payload
    },
  },
})

export const { updateBookingData, updateBookingVisitDate } =
  bookingSlice.actions

export default bookingSlice.reducer
