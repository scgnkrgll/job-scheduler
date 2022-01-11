import { FC } from "react"
import { Route, useNavigate, Routes } from "react-router-dom"
import ScheduleEditDialog from "./schedule-edit-dialog"
import JobEditDialog from "./job-edit-dialog"
import WorkerEditDialog from "./worker-edit-dialog"
import CalendarPage from "./CalendarPage"
import { ISchedulerActionsContext, SchedulerActionsProvider } from "./SchedulerActionsContext"

const SchedulerPage: FC = () => {
  const navigate = useNavigate()

  const actions: ISchedulerActionsContext = {
    openScheduleEditDialog: (date, jobId) => {
      navigate(`/schedules/new/${date}/${jobId}`)
    },
    openJobEditDialog: (id) => {
      navigate(`/schedules/job/edit/${id}`)
    },
    openNewJobDialog: () => {
      navigate(`/schedules/job/new`)
    },
    openNewWorkerDialog: () => {
      navigate(`/schedules/worker/new`)
    },
  }

  return (
    <SchedulerActionsProvider value={actions}>
      <Routes>
        <Route
          path="/schedules/new/:date/:jobId"
          element={
            <ScheduleEditDialog
              onHide={() => {
                navigate("/schedules")
              }}
            />
          }
        />
        <Route
          path="/schedules/job/edit/:id"
          element={
            <JobEditDialog
              onHide={() => {
                navigate("/schedules")
              }}
            />
          }
        />
        <Route
          path="/schedules/job/new"
          element={
            <JobEditDialog
              onHide={() => {
                navigate("/schedules")
              }}
              create
            />
          }
        />
        <Route
          path="/schedules/worker/new"
          element={
            <WorkerEditDialog
              onHide={() => {
                navigate("/schedules")
              }}
              create
            />
          }
        />
      </Routes>
      <CalendarPage />
    </SchedulerActionsProvider>
  )
}

export default SchedulerPage
