import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { Leagues, SportInfo } from '@/model/sports'
import { EventList } from '@/modules/Event/EventList'
import { EventWidget } from '@/modules/Event/EventWidget'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { LeaguesPanel } from '@/modules/Leagues'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'

export default function Home(props: {
  selSlug: string
  selectedSport: string
  sports: SportInfo[]
  leagues: Leagues[]
}) {
  const { mobileWindowSize } = useWindowSizeContext()

  useEffect(() => {
    document.title = 'Sofascore - ' + props.selectedSport
  }, [props.selectedSport])

  return (
    <>
      <Box as="main">
        <Header selectedSport={props.selectedSport} sports={props.sports} homePage={true} />
        <Box h="48px" w="100%"></Box>
        <Flex justifyContent="center" gap="24px">
          {mobileWindowSize ? null : <LeaguesPanel selectedSport={props.selSlug} leagues={props.leagues} />}
          <EventList leagues={props.leagues} selSlug={props.selSlug} />
          {mobileWindowSize ? null : <EventWidget />}
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

    const resp2 = await fetch('https://academy-backend.sofascore.dev/sport/football/tournaments')

    const details2: Leagues[] = await resp2.json()

    const leagues: Leagues[] = details2
    return {
      props: { selSlug, selectedSport, sports, leagues },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
