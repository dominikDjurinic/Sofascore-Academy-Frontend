import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'

interface ContextValue {
  openedTab: string
  setOpenedTab: Dispatch<SetStateAction<string>>
}

const TabContext = createContext<ContextValue>({} as ContextValue)

export const TabContextProvider = ({ children }: PropsWithChildren) => {
  //globalno stanje za odredivanje trenutno otvorenog taba na pageovima: tournament, team ili player
  const [openedTab, setOpenedTab] = useState('Matches')

  return <TabContext.Provider value={{ openedTab, setOpenedTab }}>{children}</TabContext.Provider>
}

export const useTabContext = () => useContext(TabContext)
