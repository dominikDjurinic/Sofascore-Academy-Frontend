import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'

interface ContextValue {
  engDate: boolean | undefined
  setEngDate: Dispatch<SetStateAction<boolean | undefined>>
}

const DateFormatContext = createContext<ContextValue>({} as ContextValue)

export const DateFormatContextProvider = ({ children }: PropsWithChildren) => {
  //globalno stanje vrste zapisa datuma (hrv ili eng zapis) - modifikacija moguca unutar settings
  const [engDate, setEngDate] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const data = localStorage.getItem('dateFormatMiniSofa')
    if (data !== null && data !== 'undefined') {
      setEngDate(JSON.parse(data))
    } else {
      setEngDate(false)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('dateFormatMiniSofa', JSON.stringify(engDate))
  }, [engDate])

  return <DateFormatContext.Provider value={{ engDate, setEngDate }}>{children}</DateFormatContext.Provider>
}

export const useDateFormatContext = () => useContext(DateFormatContext)
