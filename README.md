# Job scheduler

This project was created by using React, Redux, Redux Toolkit, Material UI and json-server.

Usage
-----
To bootstrap the job scheduler, run the following command:
```
yarn
yarn start
```

Runs the application in development mode.

### Schedule a job

To schedule a job, click one of the on the `+` buttons in the desired job's row and desired time's column.

![App](/screenshots/app.png "App")

A schedule dialog will appear. Select a worker and a shift and click `Schedule`.

![Schedule a job](/screenshots/schedule-a-job.png "Schedule a job")

### Create a worker

Click `CREATE A NEW WORKER` buton in the `Schedule` dialog.

### Cancel a job

Click on the `x` button in the label of the job you want to cancel.

### Edit a worker

Click on the the label of the worker you want to edit.

### Edit a job type

Click on top of the job type you want to edit.

### Add a job type

Click `ADD JOB` button on the bottom left of the calendar.


API
----
For more information about the API, please refer to the [API documentation](./API.md).
