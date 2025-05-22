import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  oldId: null,
  oldDate: null,
  oldTime: null,
  newDate: null,
  newTime: null,
}

export const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    setTrainingData: (state, action) => {
      const { oldId, oldDate, oldTime, newDate, newTime } = action.payload;
      state.oldId = oldId ?? state.oldId;
      state.oldDate = oldDate ?? state.oldDate;
      state.oldTime = oldTime ?? state.oldTime;
      state.newDate = newDate ?? state.newDate;
      state.newTime = newTime ?? state.newTime ;
    },
    resetTrainingData: (state) => {
      state.oldId = null;
      state.oldDate = null;
      state.oldTime = null;
      state.newDate = null;
      state.newTime = null;
    }
  },
})

export const { setTrainingData, resetTrainingData } = transferSlice.actions

export default transferSlice.reducer