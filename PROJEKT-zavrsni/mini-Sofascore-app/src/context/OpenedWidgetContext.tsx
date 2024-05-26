import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'

interface ContextValue {
  openedWidget: boolean
  setOpenedWidget: Dispatch<SetStateAction<boolean>>
}

const WidgetContext = createContext<ContextValue>({} as ContextValue)

export const WidgetContextProvider = ({ children }: PropsWithChildren) => {
  const [openedWidget, setOpenedWidget] = useState(false)

  return <WidgetContext.Provider value={{ openedWidget, setOpenedWidget }}>{children}</WidgetContext.Provider>
}

export const useWidgetContext = () => useContext(WidgetContext)
