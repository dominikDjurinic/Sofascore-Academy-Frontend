import { useSlugContext } from '@/context/SlugContext'
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
import { useEffect } from 'react'

export default function Match(props: {
  leagues: Leagues[]
  sports: SportInfo[]
  matchId: number
  data: SportDateEvent
  selSlug: string
}) {
  const { mobileWindowSize } = useWindowSizeContext()

  const { setSlug } = useSlugContext()

  useEffect(() => {
    setSlug(props.selSlug)
  }, [props.selSlug])

  return (
    <>
      <Head>
        <title>
          {props.data.homeTeam.name} vs {props.data.awayTeam.name} | Sofascore
        </title>
      </Head>
      {mobileWindowSize !== undefined ? (
        <Box as="main" position="relative" minHeight="100vh">
          <Header selectedSport={props.selSlug} sports={props.sports} />
          <Box h="48px" w="100%"></Box>
          <Flex justifyContent="center" gap="24px" paddingBottom="130px">
            {mobileWindowSize ? null : <LeaguesPanel leagues={props.leagues} selLeagueId={props.data.tournament.id} />}
            <EventWidget id={props.matchId} detailPage={true} subPanel={false} selSlug={props.selSlug} />
            {mobileWindowSize ? null : <Advertisement />}
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
    const { sportName, matchId } = params

    const resp = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const details: SportInfo[] = await resp.json()

    if (details.find(({ slug }) => slug === sportName) === undefined) {
      return { notFound: true }
    }

    const selSlug = sportName

    const sports: SportInfo[] = details

    const resp2 = await fetch(`https://academy-backend.sofascore.dev/sport/${sportName}/tournaments`)

    const details2: Leagues[] = await resp2.json()

    const leagues: Leagues[] = details2

    const resp3 = await fetch(`https://academy-backend.sofascore.dev/event/${matchId}`)

    const details3: SportDateEvent = await resp3.json()

    const data: SportDateEvent = details3
    return {
      props: { sports, leagues, matchId, data, selSlug },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
