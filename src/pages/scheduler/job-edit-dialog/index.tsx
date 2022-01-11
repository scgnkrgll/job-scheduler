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
import { fetchJobsAsync, Job, jobsSelector, updateJobAsync } from "../../../state/jobs"

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
})

const ScheduleEditDialog: FC<{ onHide: () => void }> = ({ onHide }) => {
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

  const onSubmit = (data: Omit<Job, "id">) => {
    if (id) saveJob({ id: parseInt(id), ...data })
  }

  return (
    <Dialog open={true} onClose={onHide}>
      <DialogTitle>Edit job</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>You can edit the job name here.</DialogContentText>
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

export default ScheduleEditDialog
