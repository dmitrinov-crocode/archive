import { configureStore } from "@reduxjs/toolkit"
import bookingReducer from "./bookingSlice"
import transferSlice from "./transferTrainingData"
import { combineReducers } from "redux"
import storage from "redux-persist/lib/storage"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

const reducers = combineReducers({
  booking: bookingReducer,
  transfer: transferSlice,
})

const persistConfig = {
  key: "redux_app",
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // serializableCheck: false,
      },
    }),
})

export default store