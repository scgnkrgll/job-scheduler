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

import { useAppDispatch, useAppSelector } from "../../../state"
import { FormInputText } from "../../../Components/FormInputs/FormInputText"
import { createJobAsync, fetchJobsAsync, Job, jobsSelector, updateJobAsync } from "../../../state/jobs"

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
})

const JobEditDialog: FC<{ onHide: () => void; create?: boolean }> = ({ onHide, create }) => {
  const { id } = useParams<{ id: string }>()

  const dispatch = useAppDispatch()
  const job = useAppSelector((state) => jobsSelector.selectById(state, id!))

  const methods = useForm({
    defaultValues: {
      name: job?.name || "",
    },
    resolver: yupResolver(schema),
  })
  const { handleSubmit, reset, control, setValue, watch } = methods

  useEffect(() => {
    dispatch(fetchJobsAsync())
  }, [dispatch])

  const saveJob = (job: Job) => {
    dispatch(updateJobAsync(job)).then(() => onHide())
  }

  const createJob = (job: Omit<Job, "id">) => {
    dispatch(createJobAsync(job)).then(() => onHide())
  }

  const onSubmit = (data: Omit<Job, "id">) => {
    if (create) createJob(data)
    else if (id) saveJob({ id: parseInt(id), ...data })
  }

  return (
    <Dialog open={true} onClose={onHide}>
      <DialogTitle>{create ? "Create Job" : "Edit Job"}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>{create ? "Create a new job" : "You can edit the job name here."}</DialogContentText>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <FormInputText label="Name" name="name" control={control} />
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

export default JobEditDialog
