import { HeadingPanel } from '@/components/HeadingPanel'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
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
import { TeamDetails, TeamPlayer } from '@/model/team'
import { TeamInfo } from '@/modules/TeamDetails/TeamInfo'
import { Venue } from '@/modules/TeamDetails/Venue'
import { TournamentDetails } from '@/model/tournaments'
import { Tournaments } from '@/modules/TeamDetails/Tournaments'
import { TeamNextMatch } from '@/modules/TeamDetails/TeamNextMatch'
import { PlayerDetails } from '@/model/players'
import { Squad } from '@/modules/TeamDetails/Squad'

export default function TeamPage(props: {
  leagues: Leagues[]
  sports: SportInfo[]
  teamId: number
  teamDetails: TeamDetails
  teamPlayers: TeamPlayer[]
  teamTournaments: TournamentDetails[]
  players: PlayerDetails[]
  selSlug: string
}) {
  const tabs = ['Details', 'Matches', 'Standings', 'Squad']

  const { mobileWindowSize } = useWindowSizeContext()
  const { openedWidget } = useWidgetContext()

  const [eventId, setEventId] = useState(0)
  const [selTour, setSelTour] = useState(props.teamTournaments[0].id)
  const { openedTab, setOpenedTab } = useTabContext()

  useEffect(() => {
    setOpenedTab('Details')
    console.log(props.teamId)
  }, [props.teamId])

  const tabElements = () => {
    switch (openedTab) {
      case 'Details':
        return mobileWindowSize ? (
          <VStack w="100%" gap="5px">
            <TeamInfo teamDetails={props.teamDetails} teamPlayers={props.teamPlayers} />
            <Tournaments teamTournaments={props.teamTournaments} />
            <Venue teamDetails={props.teamDetails} />
            <TeamNextMatch teamDetails={props.teamDetails} />
          </VStack>
        ) : (
          <Flex gap="24px" w="100%">
            <VStack gap="12px" w="100%">
              <TeamInfo teamDetails={props.teamDetails} teamPlayers={props.teamPlayers} />
              <Venue teamDetails={props.teamDetails} />
            </VStack>
            <VStack gap="12px" w="100%">
              <Tournaments teamTournaments={props.teamTournaments} />
              <TeamNextMatch teamDetails={props.teamDetails} />
            </VStack>
          </Flex>
        )
      case 'Matches':
        return (
          <Flex justify="space-between">
            <MatchPanel teamId={props.teamDetails.id} eventId={id => setEventId(id)} apiFor={'team'} />
            {mobileWindowSize ? null : (
              <>{openedWidget === false ? null : <EventWidget id={eventId} detailPage={false} subPanel={true} />}</>
            )}
          </Flex>
        )
      case 'Standings':
        return (
          <StandingsPanel
            tournamentId={props.teamTournaments.find(({ id }) => id === selTour)?.id}
            selSlug={props.selSlug}
            teamId={props.teamDetails.id}
            tournaments={props.teamTournaments}
            selTournament={(id: number) => setSelTour(id)}
          />
        )
      case 'Squad':
        return <Squad players={props.players} teamDetails={props.teamDetails} selSlug={props.selSlug} />
    }
  }

  return (
    <>
      <Head>
        <title>{props.teamDetails.name} | Sofascore</title>
      </Head>
      <Box as="main" minHeight="100vh" position="relative">
        <Header selectedSport={props.selSlug} sports={props.sports} />
        <Box h="48px" w="100%"></Box>
        <Flex justify="center" gap="24px" paddingBottom="130px">
          {mobileWindowSize ? null : <LeaguesPanel leagues={props.leagues} selLeagueId={undefined} />}
          <VStack w={`${mobileWindowSize ? '100%' : '60%'}`} gap={`${mobileWindowSize ? '5px' : '12px'}`}>
            <HeadingPanel
              key={props.teamId}
              name={props.teamDetails.name}
              country={props.teamDetails.country.name}
              imageLogo={`https://academy-backend.sofascore.dev/team/${props.teamId}/image`}
              tabs={tabs}
            />
            {tabElements()}
          </VStack>
        </Flex>
        <Footer />
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params, res } = context
  //console.log(params?.date)

  try {
    //@ts-ignore
    const teamId = params?.teamId
    const selSlug = params?.sportName
    const resp2 = await fetch(`https://academy-backend.sofascore.dev/sport/${params?.sportName}/tournaments`)

    const details2: Leagues[] = await resp2.json()

    const leagues: Leagues[] = details2

    const res = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const detail: SportInfo[] = await res.json()

    const sports: SportInfo[] = detail

    const resp3 = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}`)

    const details3: TeamDetails = await resp3.json()

    const teamDetails: TeamDetails = details3

    const resp4 = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}/players`)

    const details4: TeamPlayer[] = await resp4.json()

    const teamPlayers: TeamPlayer[] = details4

    const resp5 = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}/tournaments`)

    const details5: TournamentDetails[] = await resp5.json()

    const teamTournaments: TournamentDetails[] = details5

    const resp6 = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}/players`)

    const details6: PlayerDetails[] = await resp6.json()

    const players: PlayerDetails[] = details6

    return {
      props: { leagues, sports, teamDetails, teamId, teamPlayers, teamTournaments, players, selSlug },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
