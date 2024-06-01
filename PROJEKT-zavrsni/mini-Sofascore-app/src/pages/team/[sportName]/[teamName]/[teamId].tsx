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

export default function TeamPage(props: {
  leagues: Leagues[]
  selectedSport: string
  sports: SportInfo[]
  teamId: number
  teamDetails: TeamDetails
  teamPlayers: TeamPlayer[]
}) {
  const tabs = ['Details', 'Matches', 'Standings', 'Squad']

  const { mobileWindowSize } = useWindowSizeContext()
  const { openedWidget } = useWidgetContext()

  const [eventId, setEventId] = useState(0)
  const { openedTab, setOpenedTab } = useTabContext()

  useEffect(() => {
    setOpenedTab('Details')
  }, [props.teamId])

  /*const tabElements = () => {
    switch (openedTab) {
      case 'Details':
        return 
        break
      case 'Matches':
        break
      case 'Standings':
        break
      case 'Squad':
        break
    }
  }*/

  return (
    <>
      <Head>
        <title>{props.teamDetails.name} | Sofascore</title>
      </Head>
      <Box as="main" minHeight="100vh" position="relative">
        <Header selectedSport={props.selectedSport} sports={props.sports} homePage={true} />
        <Box h="48px" w="100%"></Box>
        <Flex justify="center" gap="24px" paddingBottom="130px">
          <LeaguesPanel leagues={props.leagues} selectedSport={props.selectedSport} selLeagueId={undefined} />
          <VStack w="60%" gap="12px">
            <HeadingPanel
              name={props.teamDetails.name}
              country={props.teamDetails.country.name}
              imageLogo={`https://academy-backend.sofascore.dev/team/${props.teamId}/image`}
              tabs={tabs}
            />
            <TeamInfo teamDetails={props.teamDetails} teamPlayers={props.teamPlayers} />
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
    const resp2 = await fetch(`https://academy-backend.sofascore.dev/sport/${params?.sportName}/tournaments`)

    const details2: Leagues[] = await resp2.json()

    const leagues: Leagues[] = details2

    const selectedSport = details2[0].sport.name

    const res = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const detail: SportInfo[] = await res.json()

    const sports: SportInfo[] = detail

    const resp3 = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}`)

    const details3: TeamDetails = await resp3.json()

    const teamDetails: TeamDetails = details3
    const resp4 = await fetch(`https://academy-backend.sofascore.dev/team/${teamId}/players`)

    const details4: TeamPlayer[] = await resp4.json()

    const teamPlayers: TeamPlayer[] = details4

    return {
      props: { leagues, selectedSport, sports, teamDetails, teamId, teamPlayers },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
