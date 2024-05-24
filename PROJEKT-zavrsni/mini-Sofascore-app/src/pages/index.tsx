import { useSlugContext } from '@/context/SlugContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { SportDateEvent } from '@/model/events'
import { Leagues, SportInfo } from '@/model/sports'
import { EventList } from '@/modules/Event/EventList'
import { EventWidget } from '@/modules/Event/EventWidget'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { LeaguesPanel } from '@/modules/Leagues'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import Head from 'next/head'

export default function Home(props: {
  selSlug: string
  selectedSport: string
  sports: SportInfo[]
  leagues: Leagues[]
  events: SportDateEvent[]
  date: string
}) {
  const { mobileWindowSize } = useWindowSizeContext()
  const { setSlug } = useSlugContext()

  useEffect(() => {
    setSlug(props.selSlug)
  }, [props.selectedSport])

  const setTitle = () => {
    if (props.selSlug === 'football') {
      return `Football⚽ | Sofascore`
    } else if (props.selSlug === 'basketball') {
      return `Basketball🏀 | Sofascore`
    } else {
      return `American-Football🏈 | Sofascore`
    }
  }

  return (
    <>
      <Head>
        <title>{setTitle()}</title>
      </Head>
      <Box as="main">
        <Header selectedSport={props.selectedSport} sports={props.sports} homePage={true} />
        <Box h="48px" w="100%"></Box>
        <Flex justifyContent="center" gap="24px" paddingBottom="130px">
          {mobileWindowSize ? null : <LeaguesPanel selectedSport={props.selSlug} leagues={props.leagues} />}
          <EventList leagues={props.leagues} selSlug={props.selSlug} data={props.events} date={props.date} />
          {mobileWindowSize ? null : <EventWidget />}
        </Flex>
        <Footer />
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { res } = context

  const formattingDate = () => {
    const format = new Date().toISOString().split('T')[0]
    return format
  }

  const today = formattingDate()
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

    const resp3 = await fetch(`https://academy-backend.sofascore.dev/sport/${selSlug}/events/${today}`)

    const detail: SportDateEvent[] = await resp3.json()

    const events: SportDateEvent[] = detail

    const date = formattingDate()
    return {
      props: { selSlug, selectedSport, sports, leagues, events, date },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
