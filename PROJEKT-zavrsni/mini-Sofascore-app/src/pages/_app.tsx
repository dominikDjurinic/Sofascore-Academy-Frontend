import '@/styles/globals.css'
import { ThemeContextProvider } from '@/context/ThemeContext'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { WindowSizeContextProvider } from '@/context/WindowSizeContext'
import { SlugContextProvider } from '@/context/SlugContext'
import { WidgetContextProvider } from '@/context/OpenedWidgetContext'

//@ts-ignore
export const fetcher = (...args) =>
  //@ts-ignore
  fetch(...args).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('404')
    }
  })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <WidgetContextProvider>
        <SlugContextProvider>
          <WindowSizeContextProvider>
            <ThemeContextProvider>
              <Component {...pageProps} />
            </ThemeContextProvider>
          </WindowSizeContextProvider>
        </SlugContextProvider>
      </WidgetContextProvider>
    </SWRConfig>
  )
}
