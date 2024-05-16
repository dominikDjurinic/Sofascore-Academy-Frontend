import { useThemeContext } from '@/context/ThemeContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { SportInfo } from '@/model/sports'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { Box, Button } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

export default function Home(props: { selectedSport: string; sports: SportInfo[] }) {
  const { setIsDark } = useThemeContext()
  const { mobileWindowSize } = useWindowSizeContext()

  return (
    <>
      <Head>
        <title>Sofascore - {props.selectedSport}</title>
      </Head>
      <Box as="main">
        <Header selectedSport={props.selectedSport} sports={props.sports} />
        {mobileWindowSize ? (
          <Box as="h1" color="colors.primary">
            Ja sam mobile version of app!
          </Box>
        ) : null}
        <Button onClick={() => setIsDark(v => !v)}>Toggle theme</Button>
        <Footer />
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { res } = context

  try {
    //@ts-ignore
    const resp = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const details: SportInfo[] = await resp.json()

    let selectedSport = details.find(({ slug }) => slug === 'football')?.name

    const sports: SportInfo[] = details

    return {
      props: { selectedSport, sports },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
