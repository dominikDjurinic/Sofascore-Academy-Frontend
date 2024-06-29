import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'

interface ContextValue {
  isDark: boolean | undefined
  setIsDark: Dispatch<SetStateAction<boolean | undefined>>
}

const ThemeContext = createContext<ContextValue>({} as ContextValue)

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  //globalno stanje theme (light ili dark mode) te s obzirom na trenutno stanje prilagodba elemenata stranice
  const [isDark, setIsDark] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const data = localStorage.getItem('themeDarkMiniSofa')
    if (data !== null && data !== 'undefined') {
      setIsDark(JSON.parse(data))
    } else {
      setIsDark(false)
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('themeDarkMiniSofa', JSON.stringify(isDark))
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return <ThemeContext.Provider value={{ isDark, setIsDark }}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => useContext(ThemeContext)
