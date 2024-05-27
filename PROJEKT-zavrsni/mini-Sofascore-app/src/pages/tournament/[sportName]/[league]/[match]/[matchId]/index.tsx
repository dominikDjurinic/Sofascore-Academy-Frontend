import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { SportDateEvent } from '@/model/events'
import { Leagues, SportInfo } from '@/model/sports'
import { Advertisement } from '@/modules/Advertisement'
import { EventWidget } from '@/modules/Details Event/EventWidget'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { LeaguesPanel } from '@/modules/Leagues'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

export default function Match(props: {
  selectedSport: string
  leagues: Leagues[]
  sports: SportInfo[]
  matchId: number
  data: SportDateEvent
}) {
  const { mobileWindowSize } = useWindowSizeContext()
  return (
    <>
      <Head>
        <title>
          {props.data.homeTeam.name} vs {props.data.awayTeam.name} | Sofascore
        </title>
      </Head>
      <Box as="main" position="relative" minHeight="100vh">
        <Header selectedSport={props.selectedSport} sports={props.sports} homePage={true} />
        <Box h="48px" w="100%"></Box>
        <Flex justifyContent="center" gap="24px" paddingBottom="130px">
          {mobileWindowSize ? null : (
            <LeaguesPanel
              selectedSport={props.selectedSport}
              leagues={props.leagues}
              selLeagueId={props.data.tournament.id}
            />
          )}
          <EventWidget id={props.matchId} detailPage={true} />
          {mobileWindowSize ? null : <Advertisement />}
        </Flex>
        <Footer />
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params, res } = context

  try {
    //@ts-ignore
    const { sportName, matchId } = params

    const resp = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const details: SportInfo[] = await resp.json()

    if (details.find(({ slug }) => slug === sportName) === undefined) {
      return { notFound: true }
    }

    let selectedSport = details.find(({ slug }) => slug === sportName)?.name

    const sports: SportInfo[] = details

    const resp2 = await fetch(`https://academy-backend.sofascore.dev/sport/${sportName}/tournaments`)

    const details2: Leagues[] = await resp2.json()

    const leagues: Leagues[] = details2

    const resp3 = await fetch(`https://academy-backend.sofascore.dev/event/${matchId}`)

    const details3: SportDateEvent = await resp3.json()

    const data: SportDateEvent = details3
    return {
      props: { selectedSport, sports, leagues, matchId, data },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
