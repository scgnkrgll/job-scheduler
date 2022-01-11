import { FC, createContext, useContext } from "react"

export interface ISchedulerActionsContext {
  openScheduleEditDialog: (date: string, jobId: string | number) => void
  openJobEditDialog: (id: string | number) => void
  openNewJobDialog: () => void
}
export const SchedulerActionsProvider: FC<{ value: ISchedulerActionsContext }> = ({ children, value }) => {
  return <SchedulerActionsContext.Provider value={value}>{children}</SchedulerActionsContext.Provider>
}

const SchedulerActionsContext = createContext<Partial<ISchedulerActionsContext>>({})

export const useSchedulerActions = () => useContext(SchedulerActionsContext)
