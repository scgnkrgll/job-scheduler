import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import client from "../../api/client"
import type { RootState } from "../index"

export interface Schedule {
  id: number
  date: string
  shift: "morning" | "evening"
  workerId: number
}

interface ScheduleState {
  schedules: Schedule[]
  schedulesLoaded: boolean
  schedulesFetchStatus: string
  schedulesFetchError: string | null | undefined
}

const initialState: ScheduleState = {
  schedules: [],
  schedulesLoaded: false,
  schedulesFetchStatus: "idle",
  schedulesFetchError: null,
}

const schedulesAdapter = createEntityAdapter<Schedule>()

export const fetchSchedulesAsync = createAsyncThunk("schedules/fetch", async () => {
  const response = await client.get<Schedule[]>("/schedules")
  return response
})

export const createScheduleAsync = createAsyncThunk("schedules/create", async (schedule: Omit<Schedule, "id">) => {
  const response = await client.post<Schedule>("/schedules", schedule)
  return response
})

export const updateScheduleAsync = createAsyncThunk("schedules/update", async (schedule: Schedule) => {
  const response = await client.put<Schedule>(`/schedules/${schedule.id}`, schedule)
  return response
})

export const deleteScheduleAsync = createAsyncThunk("schedules/delete", async (id: number) => {
  const response = await client.delete<Schedule>(`/schedules/${id}`)
  return response
})

export const schedulesSlice = createSlice({
  name: "schedules",
  initialState: schedulesAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSchedulesAsync.pending, (state) => {
      state.schedulesFetchStatus = "loading"
    })
    builder.addCase(fetchSchedulesAsync.fulfilled, (state, action) => {
      schedulesAdapter.setAll(state, action.payload)
      state.schedulesFetchStatus = "succeeded"
      state.schedulesLoaded = true
    })
    builder.addCase(fetchSchedulesAsync.rejected, (state, action) => {
      state.schedulesFetchStatus = "failed"
      state.schedulesFetchError = action.error.message
    })

    builder.addCase(createScheduleAsync.pending, (state) => {
      state.schedulesFetchStatus = "loading"
    })
    builder.addCase(createScheduleAsync.fulfilled, (state, action) => {
      state.schedulesFetchStatus = "succeeded"
      schedulesAdapter.upsertOne(state, action.payload)
    })
    builder.addCase(createScheduleAsync.rejected, (state, action) => {
      state.schedulesFetchStatus = "failed"
      state.schedulesFetchError = action.error.message
    })

    builder.addCase(updateScheduleAsync.pending, (state) => {
      state.schedulesFetchStatus = "loading"
    })
    builder.addCase(updateScheduleAsync.fulfilled, (state, action) => {
      state.schedulesFetchStatus = "succeeded"
      schedulesAdapter.updateOne(state, { id: action.meta.arg.id, changes: action.payload })
    })
    builder.addCase(updateScheduleAsync.rejected, (state, action) => {
      state.schedulesFetchStatus = "failed"
      state.schedulesFetchError = action.error.message
    })

    builder.addCase(deleteScheduleAsync.pending, (state) => {
      state.schedulesFetchStatus = "loading"
    })
    builder.addCase(deleteScheduleAsync.fulfilled, (state, action) => {
      state.schedulesFetchStatus = "succeeded"
      schedulesAdapter.removeOne(state, action.meta.arg)
    })
    builder.addCase(deleteScheduleAsync.rejected, (state, action) => {
      state.schedulesFetchStatus = "failed"
      state.schedulesFetchError = action.error.message
    })
  },
})

// export const {} = schedulesSlice.actions

export const schedulesSelector = schedulesAdapter.getSelectors((state: RootState) => state.schedules)

export default schedulesSlice.reducer
