<a name="top"></a>
# Scheduler

Scheduler API

# Table of contents

- [Schedules](#Schedules)
  - [List Schedules](#List-schedules)
  - [Schedule a job](#Schedule-a-job)
  - [Unschedule a job](#Unschedule-a-job)
- [Workers](#Workers)
  - [List Workers](#List-workers)
  - [Create a Worker](#Create-a-worker)
  - [Edit Worker](#Edit-worker)
  - [Delete a Worker](#Delete-a-worker)
- [Jobs](#Jobs)
  - [List Jobs](#List-jobs)
  - [Create a Job](#Create-a-job)
  - [Edit a Job](#Edit-a-job)
  - [Delete a Job](#Delete-a-job)

___


# <a name='Schedules'></a> Schedules

## <a name='List-schedules'></a> List Schedules
[Back to top](#top)

<p>Retrieves a list of scheduled jobs.</p>

```
GET /schedules
```

### Query Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| date_gte | `String` | <p> Only return schedules that start on or after the specified date. The date must be ISO 8601 formatted. </p> <p>Example: <code>2019-01-01</code> </p> |
| date_lte | `String` | <p> Only return schedules that start on or before the specified date. The date must be ISO 8601 formatted. </p> <p>Example: <code>2019-01-01</code> </p> |

## <a name='Schedule-a-job'></a> Schedule a job
[Back to top](#top)

<p>Adds a new job to schedules.</p>

```
POST /schedules
```

### Parameters - `Request Body Parameters`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| workerId | `String` | <p> The ID of the worker to schedule. </p> |
| date | `String` | <p>The date must be ISO 8601 formatted. </p> <p>Example: <code>2019-01-01</code> </p> |
| shift | `String` | <p>The shift must be one of <code>morning</code>, or <code>evening</code>. </p> |

## <a name='Unschedule-a-job'></a> Unschedule a job
[Back to top](#top)

<p>Removes a job from schedules.</p>

```
DELETE /schedules/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Unique schedule identification.</p> |

# <a name='Workers'></a> Workers

## <a name='List-workes'></a> List Workers
[Back to top](#top)

<p>Retrieves a list of workers.</p>

```
GET /workers
```

### Query Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
|id | `Number` | <p>Unique worker identification. Multiple id parameters can be specified.</p> |

### Examples
CURL Example:

```curl
curl -X GET http://localhost:3000/workers?id=1&id=2
```

## <a name='Create-a-worker'></a> Create a Worker
[Back to top](#top)

<p>Creates a new worker.</p>

```
POST /workers
```

### Parameters - `Request Body Parameters`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
|name | `String` | <p>The name of the worker.</p> |
|job | `Number` | <p>The job id that the worker is going to be assigned to.</p> |

## <a name='Edit-worker'></a> Edit Worker
[Back to top](#top)

```
PUT /workers/:id
```

<p>Edits a worker.</p>

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
|id | `Number` | <p>Unique worker identification.</p> |

### Parameters - `Request Body Parameters`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
|name | `String` | <p>The name of the worker.</p> |


## <a name='Delete-a-worker'></a> Delete a Worker
[Back to top](#top)

<p>Deletes a worker.</p>

```
DELETE /workers/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
|id | `Number` | <p>Unique worker identification.</p> |

# <a name='Jobs'></a> Jobs

## <a name='List-jobs'></a> List Jobs
[Back to top](#top)

<p>Retrieves a list of jobs.</p>

```
GET /jobs
```

## <a name='Create-a-job'></a> Create a Job
[Back to top](#top)

<p>Creates a new job.</p>

```
POST /jobs
```

### Parameters - `Request Body Parameters`
| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
|name | `String` | <p>The name of the job.</p> |

## <a name='Edit-a-job'></a> Edit a Job
[Back to top](#top)

<p>Edits a job.</p>

```
PUT /jobs/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
|id | `Number` | <p>Unique job identification.</p> |

### Parameters - `Request Body Parameters`
| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
|name | `String` | <p>The name of the job.</p> |
|workerId | `Number` | <p>The worker id that is going to be assigned to the job. -1 means no worker, can not be empty.</p> |

## <a name='Delete-a-job'></a> Delete a Job
[Back to top](#top)

<p> Deletes a job.</p>

```
DELETE /jobs/:id
```

### Parameters - `Parameter`
| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
|id | `Number` | <p>Unique job identification.</p> |