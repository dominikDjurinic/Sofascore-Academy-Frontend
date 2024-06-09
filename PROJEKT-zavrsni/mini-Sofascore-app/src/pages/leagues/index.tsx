import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { Leagues, SportInfo } from '@/model/sports'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { LeaguesPanel } from '@/modules/Leagues'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

export default function LeaguesPage(props: { sports: SportInfo[]; leagues: Leagues[] }) {
  const { mobileWindowSize } = useWindowSizeContext()

  return (
    <>
      <Head>
        <title>Leagues</title>
      </Head>
      {mobileWindowSize !== undefined ? (
        <Box as="main" position="relative" minHeight="100vh">
          <Header selectedSport={''} sports={props.sports} leagues={true} />
          <Flex justifyContent="center" gap="24px" paddingBottom="130px">
            <LeaguesPanel leagues={props.leagues} selLeagueId={undefined} favourite={true} />
          </Flex>
          <Footer />
        </Box>
      ) : null}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params, res } = context

  try {
    //@ts-ignore
    const resp = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const details: SportInfo[] = await resp.json()

    const sports: SportInfo[] = details

    const resp_league = await fetch('https://academy-backend.sofascore.dev/sport/football/tournaments')

    const details_league: Leagues[] = await resp_league.json()

    const resp_league2 = await fetch('https://academy-backend.sofascore.dev/sport/basketball/tournaments')

    const details_league2: Leagues[] = await resp_league2.json()

    const resp_league3 = await fetch('https://academy-backend.sofascore.dev/sport/american-football/tournaments')

    const details_league3: Leagues[] = await resp_league3.json()

    let arr = details_league.concat(details_league2)
    arr = arr.concat(details_league3)

    const leagues: Leagues[] = arr

    return {
      props: { sports, leagues },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
