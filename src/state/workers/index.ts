import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import client from "../../api/client"
import type { RootState } from "../index"

export interface Worker {
  id: number
  name: string
  jobId: number
}

interface workersState {
  workersLoaded: boolean
  workersFetchStatus: string
  workersFetchError: string | null | undefined
}

const initialState: workersState = {
  workersLoaded: false,
  workersFetchStatus: "idle",
  workersFetchError: null,
}

const workersAdapter = createEntityAdapter<Worker>()

export const fetchWorkersAsync = createAsyncThunk("workers/fetch", async () => {
  const response = await client.get<Worker[]>("/workers")
  return response
})

export const fetchWorkersByIdsAsync = createAsyncThunk("workers/fetchByIds", async (ids: number[]) => {
  const response = await client.get<Worker[]>(`/workers?id=${ids.join("&id=")}`)
  return response
})

export const createWorkerAsync = createAsyncThunk("workers/create", async (worker: Omit<Worker, "id">) => {
  const response = await client.post<Worker>("/workers", worker)
  return response
})

export const updateWorkerAsync = createAsyncThunk("workers/update", async (worker: Worker) => {
  const response = await client.put<Worker>(`/workers/${worker.id}`, worker)
  return response
})

export const deleteWorkerAsync = createAsyncThunk("workers/delete", async (id: number) => {
  const response = await client.delete<"">(`/workers/${id}`)
  return response
})

export const workersSlice = createSlice({
  name: "workers",
  initialState: workersAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWorkersAsync.pending, (state) => {
      state.workersFetchStatus = "loading"
    })
    builder.addCase(fetchWorkersAsync.fulfilled, (state, action) => {
      workersAdapter.setAll(
        state,
        action.payload.filter((worker) => worker.id !== -1)
      )
      state.workersFetchStatus = "succeeded"
      state.workersLoaded = true
    })
    builder.addCase(fetchWorkersAsync.rejected, (state, action) => {
      state.workersFetchStatus = "failed"
      state.workersFetchError = action.error.message
    })

    builder.addCase(fetchWorkersByIdsAsync.pending, (state) => {
      state.workersFetchStatus = "loading"
    })
    builder.addCase(fetchWorkersByIdsAsync.fulfilled, (state, action) => {
      workersAdapter.setAll(
        state,
        action.payload.filter((worker) => worker.id !== -1)
      )
      state.workersFetchStatus = "succeeded"
      state.workersLoaded = true
    })
    builder.addCase(fetchWorkersByIdsAsync.rejected, (state, action) => {
      state.workersFetchStatus = "failed"
      state.workersFetchError = action.error.message
    })

    builder.addCase(createWorkerAsync.pending, (state) => {
      state.workersFetchStatus = "loading"
    })
    builder.addCase(createWorkerAsync.fulfilled, (state, action) => {
      workersAdapter.addOne(state, action.payload)
      state.workersFetchStatus = "succeeded"
    })
    builder.addCase(createWorkerAsync.rejected, (state, action) => {
      state.workersFetchStatus = "failed"
      state.workersFetchError = action.error.message
    })

    builder.addCase(updateWorkerAsync.pending, (state) => {
      state.workersFetchStatus = "loading"
    })
    builder.addCase(updateWorkerAsync.fulfilled, (state, action) => {
      workersAdapter.updateOne(state, { id: action.meta.arg.id, changes: action.payload })
      state.workersFetchStatus = "succeeded"
    })
    builder.addCase(updateWorkerAsync.rejected, (state, action) => {
      state.workersFetchStatus = "failed"
      state.workersFetchError = action.error.message
    })

    builder.addCase(deleteWorkerAsync.pending, (state) => {
      state.workersFetchStatus = "loading"
    })
    builder.addCase(deleteWorkerAsync.fulfilled, (state, action) => {
      state.workersFetchStatus = "succeeded"
      workersAdapter.removeOne(state, action.meta.arg)
    })
    builder.addCase(deleteWorkerAsync.rejected, (state, action) => {
      state.workersFetchStatus = "failed"
      state.workersFetchError = action.error.message
    })
  },
})

// export const {} = workersSlice.actions

const adapterSelectors = workersAdapter.getSelectors((state: RootState) => state.workers)

const selectByJob = createSelector(
  (state: RootState) => adapterSelectors.selectAll(state),
  (_: RootState, jobId: string | number) => jobId,
  (workers, jobId) => workers.filter((worker) => worker.jobId.toString() === jobId.toString())
)

export const workersSelector = {
  selectByJob,
  ...adapterSelectors,
}

export default workersSlice.reducer
