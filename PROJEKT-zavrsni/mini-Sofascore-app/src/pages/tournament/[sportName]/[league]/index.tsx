import { HeadingPanel } from '@/components/HeadingPanel'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { TournamentDetails } from '@/model/tournaments'
import { Leagues, SportInfo } from '@/model/sports'
import { EventWidget } from '@/modules/Details Event/EventWidget'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { LeaguesPanel } from '@/modules/Leagues'
import { MatchPanel } from '@/modules/TournamentDetails/MatchPanel'
import { StandingsPanel } from '@/modules/TournamentDetails/StandingsPanel'
import { Box, Flex, VStack } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useTabContext } from '@/context/OpenedTab'

export default function LeaguePage(props: {
  leagues: Leagues[]
  sports: SportInfo[]
  selLeagueId: number
  tournamentDetails: TournamentDetails
  selSlug: string
}) {
  const tabs = ['Matches', 'Standings']

  const { mobileWindowSize } = useWindowSizeContext()
  const { openedWidget } = useWidgetContext()

  const [eventId, setEventId] = useState(0)
  const { openedTab, setOpenedTab } = useTabContext()

  useEffect(() => {
    setOpenedTab('Matches')
  }, [props.selLeagueId])

  return (
    <>
      <Head>
        <title>{props.tournamentDetails.name} | Sofascore</title>
      </Head>
      {mobileWindowSize !== undefined ? (
        <Box as="main" minHeight="100vh" position="relative">
          <Header selectedSport={props.selSlug} sports={props.sports} />
          <Box h="48px" w="100%"></Box>
          <Flex justify="center" gap="24px" paddingBottom="130px">
            {mobileWindowSize ? null : <LeaguesPanel leagues={props.leagues} selLeagueId={props.selLeagueId} />}
            <VStack w={`${mobileWindowSize ? '100%' : '60%'}`} gap={`${mobileWindowSize ? '5px' : '12px'}`}>
              <HeadingPanel
                key={props.tournamentDetails.id}
                name={props.tournamentDetails.name}
                country={props.tournamentDetails.country.name}
                imageLogo={`https://academy-backend.sofascore.dev/tournament/${props.selLeagueId}/image`}
                tabs={tabs}
              />
              {openedTab !== 'Matches' ? (
                <StandingsPanel tournamentId={props.selLeagueId} selSlug={props.selSlug} />
              ) : (
                <Flex justify="space-between">
                  <MatchPanel tournamentId={props.selLeagueId} eventId={id => setEventId(id)} apiFor={'tournament'} />
                  {mobileWindowSize ? null : (
                    <>
                      {openedWidget === false ? null : <EventWidget id={eventId} detailPage={false} subPanel={true} />}
                    </>
                  )}
                </Flex>
              )}
            </VStack>
          </Flex>
          <Footer />
        </Box>
      ) : null}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params, res } = context
  //console.log(params?.date)

  try {
    //@ts-ignore
    const leagueName = params?.league

    const resp2 = await fetch(`https://academy-backend.sofascore.dev/sport/${params?.sportName}/tournaments`)

    const details2: Leagues[] = await resp2.json()

    const leagues: Leagues[] = details2

    const selLeagueId = leagues.find(({ name }) => name === leagueName)?.id

    const res = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const detail: SportInfo[] = await res.json()

    const sports: SportInfo[] = detail

    const resp3 = await fetch(`https://academy-backend.sofascore.dev/tournament/${selLeagueId}`)

    const details3: TournamentDetails = await resp3.json()

    const tournamentDetails: TournamentDetails = details3

    const selSlug = params?.sportName

    return {
      props: { leagues, sports, selLeagueId, tournamentDetails, selSlug },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
