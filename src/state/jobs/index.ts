import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import client from "../../api/client"
import type { RootState } from "../index"

export interface Job {
  id: number
  name: string
}

interface JobState {
  jobs: Job[]
  jobsLoaded: boolean
  jobsFetchStatus: string
  jobsFetchError: string | null | undefined
}

const initialState: JobState = {
  jobs: [],
  jobsLoaded: false,
  jobsFetchStatus: "idle",
  jobsFetchError: null,
}

const jobsAdapter = createEntityAdapter<Job>()

export const fetchJobsAsync = createAsyncThunk("jobs/fetch", async () => {
  const response = await client.get<Job[]>("/jobs")
  return response
})

export const createJobAsync = createAsyncThunk("jobs/create", async (job: Omit<Job, "id">) => {
  const response = await client.post<Job>("/jobs", job)
  return response
})

export const updateJobAsync = createAsyncThunk("jobs/update", async (job: Job) => {
  const response = await client.put<Job>(`/jobs/${job.id}`, job)
  return response
})

export const deleteJobAsync = createAsyncThunk("jobs/delete", async (id: number) => {
  const response = await client.delete<Job>(`/jobs/${id}`)
  return response
})

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: jobsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJobsAsync.pending, (state) => {
      state.jobsFetchStatus = "loading"
    })
    builder.addCase(fetchJobsAsync.fulfilled, (state, action) => {
      jobsAdapter.setAll(state, action.payload)
      state.jobsFetchStatus = "succeeded"
      state.jobsLoaded = true
    })
    builder.addCase(fetchJobsAsync.rejected, (state, action) => {
      state.jobsFetchStatus = "failed"
      state.jobsFetchError = action.error.message
    })

    builder.addCase(createJobAsync.pending, (state) => {
      state.jobsFetchStatus = "loading"
    })
    builder.addCase(createJobAsync.fulfilled, (state, action) => {
      state.jobsFetchStatus = "succeeded"
      jobsAdapter.upsertOne(state, action.payload)
    })
    builder.addCase(createJobAsync.rejected, (state, action) => {
      state.jobsFetchStatus = "failed"
      state.jobsFetchError = action.error.message
    })

    builder.addCase(updateJobAsync.pending, (state) => {
      state.jobsFetchStatus = "loading"
    })
    builder.addCase(updateJobAsync.fulfilled, (state, action) => {
      state.jobsFetchStatus = "succeeded"
      jobsAdapter.updateOne(state, { id: action.meta.arg.id, changes: action.payload })
    })
    builder.addCase(updateJobAsync.rejected, (state, action) => {
      state.jobsFetchStatus = "failed"
      state.jobsFetchError = action.error.message
    })

    builder.addCase(deleteJobAsync.pending, (state) => {
      state.jobsFetchStatus = "loading"
    })
    builder.addCase(deleteJobAsync.fulfilled, (state, action) => {
      state.jobsFetchStatus = "succeeded"
      jobsAdapter.removeOne(state, action.meta.arg)
    })
    builder.addCase(deleteJobAsync.rejected, (state, action) => {
      state.jobsFetchStatus = "failed"
      state.jobsFetchError = action.error.message
    })
  },
})

// export const {} = jobsSlice.actions

export const jobsSelector = jobsAdapter.getSelectors((state: RootState) => state.jobs)

export default jobsSlice.reducer
