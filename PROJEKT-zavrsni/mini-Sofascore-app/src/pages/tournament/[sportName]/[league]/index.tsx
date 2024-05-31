import { HeadingPanel } from '@/components/HeadingPanel'
//import { Panel } from '@/components/Panel'
import { TournamentDetails } from '@/model/events'
import { Leagues, SportInfo } from '@/model/sports'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { LeaguesPanel } from '@/modules/Leagues'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
//import Image from 'next/image'

export default function LeaguePage(props: {
  leagues: Leagues[]
  selectedSport: string
  sports: SportInfo[]
  selLeagueId: number
  tournamentDetails: TournamentDetails
}) {
  const tabs = ['Matches', 'Standings']

  return (
    <>
      <Head>
        <title>{props.tournamentDetails.name} | Sofascore</title>
      </Head>
      <Box as="main" minHeight="100vh" position="relative">
        <Header selectedSport={props.selectedSport} sports={props.sports} homePage={true} />
        <Box h="48px" w="100%"></Box>
        <Flex justify="center" gap="24px" paddingBottom="130px">
          <LeaguesPanel leagues={props.leagues} selectedSport={props.selectedSport} selLeagueId={props.selLeagueId} />
          <HeadingPanel
            name={props.tournamentDetails.name}
            country={props.tournamentDetails.country.name}
            imageLogo={`https://academy-backend.sofascore.dev/tournament/${props.selLeagueId}/image`}
            tabs={tabs}
          />
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
    const leagueName = params?.league

    const resp2 = await fetch(`https://academy-backend.sofascore.dev/sport/${params?.sportName}/tournaments`)

    const details2: Leagues[] = await resp2.json()

    const leagues: Leagues[] = details2

    const selLeagueId = leagues.find(({ name }) => name === leagueName)?.id

    const selectedSport = details2[0].sport.name

    const res = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const detail: SportInfo[] = await res.json()

    const sports: SportInfo[] = detail

    const resp3 = await fetch(`https://academy-backend.sofascore.dev/tournament/${selLeagueId}`)

    const details3: TournamentDetails = await resp3.json()

    const tournamentDetails: TournamentDetails = details3

    return {
      props: { leagues, selectedSport, sports, selLeagueId, tournamentDetails },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
