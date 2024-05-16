import { createContext, useContext, useEffect, useState, PropsWithChildren, SetStateAction, Dispatch } from 'react'

interface WindowSizeValues {
  mobileWindowSize: boolean
  setMobileWindowSize: Dispatch<SetStateAction<boolean>>
}

const WindowSizeContext = createContext<WindowSizeValues>({} as WindowSizeValues)

export const WindowSizeContextProvider = ({ children }: PropsWithChildren) => {
  const [mobileWindowSize, setMobileWindowSize] = useState<boolean>(false)

  useEffect(() => {
    console.log('WINDOW WIDTH ' + window.innerWidth)
    const handleResizeWindow = () => {
      if (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) <= 990) {
        setMobileWindowSize(true)
      } else {
        setMobileWindowSize(false)
      }
    }
    handleResizeWindow()
  }, [])

  useEffect(() => {
    const handleResizeWindow = () => {
      if (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) <= 990) {
        setMobileWindowSize(true)
      } else {
        setMobileWindowSize(false)
      }
    }

    window.addEventListener('resize', handleResizeWindow)

    return () => {
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [mobileWindowSize])

  return (
    <WindowSizeContext.Provider value={{ mobileWindowSize, setMobileWindowSize }}>
      {children}
    </WindowSizeContext.Provider>
  )
}

export const useWindowSizeContext = () => useContext(WindowSizeContext)
