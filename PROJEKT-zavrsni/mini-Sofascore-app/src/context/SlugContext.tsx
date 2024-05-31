import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'

interface ContextValue {
  slug: string
  setSlug: Dispatch<SetStateAction<string>>
}

const SlugContext = createContext<ContextValue>({} as ContextValue)

export const SlugContextProvider = ({ children }: PropsWithChildren) => {
  const [slug, setSlug] = useState('')

  return <SlugContext.Provider value={{ slug, setSlug }}>{children}</SlugContext.Provider>
}

export const useSlugContext = () => useContext(SlugContext)
