import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import jobsReducer from "./jobs"
import schedulesReducer from "./schedules"
import workersReducer from "./workers"

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    schedules: schedulesReducer,
    workers: workersReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
