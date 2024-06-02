import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'

interface ContextValue {
  slug: string
  setSlug: Dispatch<SetStateAction<string>>
}

const SlugContext = createContext<ContextValue>({} as ContextValue)

export const SlugContextProvider = ({ children }: PropsWithChildren) => {
  const [slug, setSlug] = useState('')

  useEffect(() => {
    const data = localStorage.getItem('slug')
    if (data) {
      setSlug(data)
    }
  }, [])

  useEffect(() => {
    if (slug !== '') localStorage.setItem('slug', slug)
  }, [slug])

  return <SlugContext.Provider value={{ slug, setSlug }}>{children}</SlugContext.Provider>
}

export const useSlugContext = () => useContext(SlugContext)
