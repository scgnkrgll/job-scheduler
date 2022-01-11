import React, { FC, useEffect, useState } from "react"
import { DateTime } from "luxon"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import CircularProgress from "@mui/material/CircularProgress"

import Typography from "@mui/material/Typography"

import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Divider from "@mui/material/Divider"

import Chip from "@mui/material/Chip"

import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"

import ChevronRight from "@mui/icons-material/ChevronRight"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import Add from "@mui/icons-material/Add"
import Edit from "@mui/icons-material/Edit"

import { useAppDispatch, useAppSelector } from "../../../state"

import { fetchJobsAsync, jobsSelector } from "../../../state/jobs"
import { fetchWorkersAsync, workersSelector } from "../../../state/workers"
import { deleteScheduleAsync, fetchSchedulesAsync, schedulesSelector } from "../../../state/schedules"
import { useSchedulerActions } from "../SchedulerActionsContext"

const getWeek = (date: DateTime) => {
  const start = date.setLocale("en").startOf("week")
  // A workaround to make the week start on Sunday
  // .minus({ days: 1 })
  return Array.from({ length: 7 }, (_, i) => start.plus({ days: i }))
}

const Calendar: FC = () => {
  const dispatch = useAppDispatch()
  const uiActions = useSchedulerActions()

  const { jobsLoaded } = useAppSelector((state) => state.jobs)
  const { workersLoaded } = useAppSelector((state) => state.workers)
  const { schedulesLoaded } = useAppSelector((state) => state.schedules)

  const jobs = useAppSelector(jobsSelector.selectAll)

  const workers = useAppSelector(workersSelector.selectAll)

  const schedules = useAppSelector(schedulesSelector.selectAll)

  useEffect(() => {
    if (!jobsLoaded) dispatch(fetchJobsAsync())
    if (!workersLoaded) dispatch(fetchWorkersAsync())
    if (!schedulesLoaded) dispatch(fetchSchedulesAsync())
  }, [dispatch, jobsLoaded, schedulesLoaded, workersLoaded])

  const [selectedDate, setSelectedDate] = useState(DateTime.local())

  const [week, setWeek] = useState(getWeek(selectedDate))

  useEffect(() => {
    setWeek(getWeek(selectedDate))
  }, [selectedDate])

  if (!jobsLoaded || !workersLoaded || !schedulesLoaded) return <CircularProgress />

  return (
    <Card>
      <CardHeader
        title={`${selectedDate.startOf("week").day} - ${selectedDate
          .endOf("week")
          .setLocale("en-GB")
          .toLocaleString(DateTime.DATE_MED)} [Week#${selectedDate.weekNumber}]`}
        action={
          <>
            <IconButton onClick={() => setSelectedDate(selectedDate.plus({ days: -7 }))}>
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={() => setSelectedDate(selectedDate.plus({ days: 7 }))}>
              <ChevronRight />
            </IconButton>
          </>
        }
      />
      <Divider />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Grid container spacing={2} columns={8}>
          <Grid item xs={1}></Grid>

          {week.map((date, i) => (
            <Grid key={i} item xs={1}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2">{date.toLocaleString({ weekday: "short" })}</Typography>
                <Typography variant="h6">{date.toISODate()}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Divider />
        {jobs.map((job) => (
          <React.Fragment key={job.id}>
            <Grid container spacing={2} columns={8}>
              <Grid item xs={1}>
                <Button
                  endIcon={<Edit />}
                  sx={{ height: "100%", width: "100%" }}
                  color="inherit"
                  onClick={() => uiActions.openJobEditDialog && uiActions.openJobEditDialog(job.id)}
                >
                  {job.name}
                </Button>
              </Grid>
              {week.map((date, i) => {
                const filteredSchedules = schedules.filter((schedule) => schedule.date === date.toISODate())
                const filteredWorkers = filteredSchedules.map((schedule) =>
                  workers.find((worker) => worker.id === schedule.workerId)
                )

                const worker = filteredWorkers.find((worker) => worker?.jobId === job.id)
                const schedule = filteredSchedules.find((schedule) => schedule.workerId === worker?.id)

                return (
                  <Grid key={i} item xs={1}>
                    {worker ? (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          minHeight: "100px",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Chip
                          color={schedule!.shift === "morning" ? "primary" : "secondary"}
                          label={<Typography>{worker?.name}</Typography>}
                          onDelete={() => dispatch(deleteScheduleAsync(schedule!.id))}
                          onClick={() => uiActions.openWorkerEditDialog && uiActions.openWorkerEditDialog(worker!.id)}
                        />
                        <Typography variant="caption">{schedule!.shift}</Typography>
                      </Box>
                    ) : (
                      <Button
                        disableElevation
                        sx={{ width: "100%", height: "100%", minHeight: "100px" }}
                        onClick={() =>
                          uiActions.openScheduleEditDialog && uiActions.openScheduleEditDialog(date.toISODate(), job.id)
                        }
                      >
                        <Add />
                      </Button>
                    )}
                  </Grid>
                )
              })}
            </Grid>
            <Divider />
          </React.Fragment>
        ))}
        <Grid container spacing={2} columns={8}>
          <Grid item xs={1}>
            <Button
              startIcon={<Add />}
              sx={{ width: "100%" }}
              onClick={() => uiActions.openNewJobDialog && uiActions.openNewJobDialog()}
            >
              Add job
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Calendar
