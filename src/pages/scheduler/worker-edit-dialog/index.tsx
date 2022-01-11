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

import {
  createWorkerAsync,
  fetchWorkersAsync,
  updateWorkerAsync,
  Worker,
  workersSelector,
} from "../../../state/workers"
import { useAppDispatch, useAppSelector } from "../../../state"
import { FormInputDropdown } from "../../../Components/FormInputs/FormInputDropdown"
import { fetchJobsAsync, jobsSelector } from "../../../state/jobs"
import { FormInputText } from "../../../Components/FormInputs/FormInputText"

const schema = yup.object().shape({
  name: yup.string().required(),
  jobId: yup.number().required(),
})

const WorkerEditDialog: FC<{ onHide: () => void; create?: boolean }> = ({ onHide, create }) => {
  const { id } = useParams<{ id: string }>()

  const dispatch = useAppDispatch()
  const jobs = useAppSelector(jobsSelector.selectAll)
  const worker = useAppSelector((state) => workersSelector.selectById(state, id!))

  const methods = useForm({
    defaultValues: {
      name: worker?.name || "",
      jobId: worker?.jobId || "",
    },
    resolver: yupResolver(schema),
  })
  const { handleSubmit, reset, control, setValue, watch } = methods

  useEffect(() => {
    dispatch(fetchWorkersAsync())
    dispatch(fetchJobsAsync())
  }, [dispatch])

  const saveWorker = (job: Worker) => {
    dispatch(updateWorkerAsync(job)).then(() => onHide())
  }

  const createWorker = (job: Omit<Worker, "id">) => {
    dispatch(createWorkerAsync(job)).then(() => onHide())
  }

  const onSubmit = (data: Omit<Worker, "id" | "date">) => {
    if (create) createWorker(data)
    else if (id) saveWorker({ id: parseInt(id), ...data })
  }

  return (
    <Dialog open={true} onClose={onHide}>
      <DialogTitle>{create ? "Create Worker" : "Edit Worker"}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>{create ? "Create a new worker" : "Edit worker"}</DialogContentText>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <FormInputText label="Name" name="name" control={control} />
          </Grid>
          <Grid item xs={12}>
            <FormInputDropdown
              name="jobId"
              label="Select a job"
              control={control}
              options={jobs.map((job) => ({ label: job.name, value: job.id }))}
              disabled={jobs.length === 0}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHide}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default WorkerEditDialog
