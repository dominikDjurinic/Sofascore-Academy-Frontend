import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { SportInfo } from '@/model/sports'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { LeaguesPanel } from '@/modules/Leagues'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'

export default function Home(props: { selSlug: string; selectedSport: string; sports: SportInfo[] }) {
  const { mobileWindowSize } = useWindowSizeContext()

  useEffect(() => {
    document.title = 'Sofascore - ' + props.selectedSport
  }, [props.selectedSport])

  return (
    <>
      <Box as="main">
        <Header selectedSport={props.selectedSport} sports={props.sports} homePage={true} />
        <Box h="48px" w="100%"></Box>
        <Flex justifyContent="center">
          {mobileWindowSize ? (
            <Box as="h1" color="colors.primary">
              Ja sam mobile version of app!
            </Box>
          ) : (
            <LeaguesPanel selectedSport={props.selSlug} />
          )}
        </Flex>
        <Footer />
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { res } = context

  try {
    //@ts-ignore
    const selSlug = 'football'

    const resp = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const details: SportInfo[] = await resp.json()

    let selectedSport = details.find(({ slug }) => slug === 'football')?.name

    const sports: SportInfo[] = details

    return {
      props: { selSlug, selectedSport, sports },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
