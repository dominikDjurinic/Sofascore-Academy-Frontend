import { Panel } from '@/components/Panel'
import { Leagues, SportInfo } from '@/model/sports'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { LeaguesPanel } from '@/modules/Leagues'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

export default function LeaguePage(props: {
  leagueName: string
  leagues: Leagues[]
  selectedSport: string
  sports: SportInfo[]
  selLeagueId: number
}) {
  return (
    <>
      <Head>
        <title>{props.leagueName} | Sofascore</title>
      </Head>
      <Box as="main" minHeight="100vh" position="relative">
        <Header selectedSport={props.selectedSport} sports={props.sports} homePage={true} />
        <Box h="48px" w="100%"></Box>
        <Flex justify="center" gap="24px" paddingBottom="130px">
          <LeaguesPanel leagues={props.leagues} selectedSport={props.selectedSport} selLeagueId={props.selLeagueId} />
          <Panel>
            <Box p="20px 16px" fontSize="20px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
              {props.leagueName}
            </Box>
          </Panel>
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

    return {
      props: { leagueName, leagues, selectedSport, sports, selLeagueId },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
