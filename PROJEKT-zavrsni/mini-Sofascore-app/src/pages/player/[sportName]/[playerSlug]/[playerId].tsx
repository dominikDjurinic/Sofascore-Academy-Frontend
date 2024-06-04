import { HeadingPanel } from '@/components/HeadingPanel'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { Leagues, SportInfo } from '@/model/sports'
import { EventWidget } from '@/modules/Details Event/EventWidget'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { LeaguesPanel } from '@/modules/Leagues'
import { Box, Flex, VStack } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { PlayerDetails } from '@/model/players'
import { SportDateEvent } from '@/model/events'
import { TeamDetails, TeamPlayer } from '@/model/team'
import { MatchPanel } from '@/modules/TournamentDetails/MatchPanel'

export default function PlayerPage(props: {
  leagues: Leagues[]
  sports: SportInfo[]
  player: PlayerDetails
  team: TeamDetails
  selSlug: string
}) {
  const tabs: string[] = []

  const { mobileWindowSize } = useWindowSizeContext()
  const { openedWidget, setOpenedWidget } = useWidgetContext()

  const [eventId, setEventId] = useState(0)

  useEffect(() => {
    setOpenedWidget(false)
  }, [])

  return (
    <>
      <Head>
        <title>{props.player.name} | Sofascore</title>
      </Head>
      {mobileWindowSize !== undefined ? (
        <Box as="main" minHeight="100vh" position="relative">
          <Header selectedSport={props.selSlug} sports={props.sports} />
          <Box h="48px" w="100%"></Box>
          <Flex justify="center" gap="24px" paddingBottom="130px">
            {mobileWindowSize ? null : <LeaguesPanel leagues={props.leagues} selLeagueId={undefined} />}
            <VStack w={`${mobileWindowSize ? '100%' : '60%'}`} gap={`${mobileWindowSize ? '5px' : '12px'}`}>
              <HeadingPanel
                key={props.player.id}
                name={props.player.name}
                country={props.player.country.name}
                imageLogo={`https://academy-backend.sofascore.dev/player/${props.player.id}/image`}
                tabs={tabs}
                player={props.player}
                team={props.team}
                selSlug={props.selSlug}
              />
              <Flex justify="space-between">
                <MatchPanel eventId={id => setEventId(id)} apiFor={'player'} playerId={props.player.id} />
                {mobileWindowSize ? null : (
                  <>
                    {openedWidget === false ? null : (
                      <EventWidget id={eventId} detailPage={false} subPanel={true} selSlug={props.selSlug} />
                    )}
                  </>
                )}
              </Flex>
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
    const playerId = params?.playerId
    const selSlug = params?.sportName

    const resp2 = await fetch(`https://academy-backend.sofascore.dev/sport/${selSlug}/tournaments`)

    const details2: Leagues[] = await resp2.json()

    const leagues: Leagues[] = details2

    const res = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const detail: SportInfo[] = await res.json()

    const sports: SportInfo[] = detail

    const resp3 = await fetch(`https://academy-backend.sofascore.dev/player/${playerId}`)

    const details3: PlayerDetails = await resp3.json()

    const player: PlayerDetails = details3

    //trazenje player teama
    const resp4 = await fetch(`https://academy-backend.sofascore.dev/player/${playerId}/events/next/0`)

    const details4: SportDateEvent[] = await resp4.json()

    const homeTeamId = details4[0]?.homeTeam.id
    const awayTeamId = details4[0]?.awayTeam.id

    let playerFound
    let teamId

    const homedata: TeamPlayer[] = await (
      await fetch(`https://academy-backend.sofascore.dev/team/${homeTeamId}/players`)
    ).json()

    playerFound = homedata.find(({ id }) => id === player.id)

    if (playerFound === undefined) {
      teamId = awayTeamId
    } else {
      teamId = homeTeamId
    }

    const resp5 = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}`)

    const details5: TeamDetails = await resp5.json()

    const team: TeamDetails = details5

    return {
      props: { leagues, sports, player, team, selSlug },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
