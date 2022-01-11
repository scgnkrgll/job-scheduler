import { FC } from "react"
import { Route, useNavigate, Routes } from "react-router-dom"
import ScheduleEditDialog from "./schedule-edit-dialog"
import CalendarPage from "./CalendarPage"
import { ISchedulerActionsContext, SchedulerActionsProvider } from "./SchedulerActionsContext"

const SchedulerPage: FC = () => {
  const navigate = useNavigate()

  const actions: ISchedulerActionsContext = {
    openScheduleEditDialog: (date, jobId) => {
      navigate(`/schedules/new/${date}/${jobId}`)
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
      </Routes>
      <CalendarPage />
    </SchedulerActionsProvider>
  )
}

export default SchedulerPage
