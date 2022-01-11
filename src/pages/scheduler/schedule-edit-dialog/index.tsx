import { FC, useEffect } from "react"
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
} from "@mui/material"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { createScheduleAsync, Schedule } from "../../../state/schedules"
import { fetchWorkersAsync, workersSelector } from "../../../state/workers"
import { useAppDispatch, useAppSelector } from "../../../state"
import { FormInputDropdown } from "../../../Components/FormInputs/FormInputDropdown"

const schema = yup.object().shape({
  workerId: yup.number().required(),
  shift: yup.string().required(),
})

const ScheduleEditDialog: FC<{ onHide: () => void }> = ({ onHide }) => {
  const { jobId, date } = useParams<{ jobId: string; date: string }>()

  const methods = useForm({
    defaultValues: {
      workerId: "",
      shift: "",
    },
    resolver: yupResolver(schema),
  })
  const { handleSubmit, reset, control, setValue, watch } = methods

  const dispatch = useAppDispatch()
  const workers = useAppSelector((state) => workersSelector.selectByJob(state, jobId!))

  useEffect(() => {
    dispatch(fetchWorkersAsync())
  }, [dispatch])

  const saveSchedule = (schedule: Omit<Schedule, "id">) => {
    // if (date) dispatch(createScheduleAsync({ date, shift: "morning", workerId: 1 })).then(() => onHide())
    if (date) dispatch(createScheduleAsync(schedule)).then(() => onHide())
  }

  const onSubmit = (data: Omit<Schedule, "id" | "date">) => {
    if (date) saveSchedule({ date, ...data })
  }

  return (
    <Dialog open={true} onClose={onHide}>
      <DialogTitle>Schedule</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>To schedule a job, please select a worker and a shift.</DialogContentText>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <FormInputDropdown
              name="workerId"
              label="Select worker"
              control={control}
              options={workers.map((worker) => ({ label: worker.name, value: worker.id }))}
              disabled={workers.length === 0}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider>or</Divider>
          </Grid>
          <Grid item xs={12} justifyContent="center" display="flex">
            <Button>Create a new worker</Button>
          </Grid>
          <Grid item xs={12}>
            <FormInputDropdown
              options={[
                { label: "Morning", value: "morning" },
                { label: "Evening", value: "evening" },
              ]}
              name="shift"
              label="Select a shift"
              control={control}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHide}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>Schedule</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ScheduleEditDialog
