import { useSlugContext } from '@/context/SlugContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { SportDateEvent } from '@/model/events'
import { Leagues, SportInfo } from '@/model/sports'
import { EventList } from '@/modules/Event/EventList'
import { EventWidget } from '@/modules/Details Event/EventWidget'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { LeaguesPanel } from '@/modules/Leagues'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { setTitle } from '@/utils/setTitle'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { Advertisement } from '@/modules/Advertisement'

export default function Home(props: {
  selSlug: string
  sports: SportInfo[]
  leagues: Leagues[]
  events: SportDateEvent[]
  date: string
}) {
  const { mobileWindowSize } = useWindowSizeContext()
  const { slug, setSlug } = useSlugContext()
  const { openedWidget } = useWidgetContext()

  console.log(openedWidget)

  useEffect(() => {
    setSlug(props.selSlug)
  }, [props.selSlug])

  const [id, setId] = useState(0)

  const openWidget = (id: number) => {
    setId(id)
  }

  return (
    <>
      <Head>
        <title>{setTitle(slug)}</title>
      </Head>
      <Box as="main" position="relative" minHeight="100vh">
        <Header selectedSport={props.selSlug} sports={props.sports} />
        {mobileWindowSize ? null : <Box h="48px" w="100%"></Box>}
        <Flex justifyContent="center" gap="24px" paddingBottom="130px">
          {mobileWindowSize ? null : <LeaguesPanel leagues={props.leagues} selLeagueId={undefined} />}
          <EventList
            leagues={props.leagues}
            selSlug={props.selSlug}
            data={props.events}
            date={props.date}
            id={openWidget}
          />
          {mobileWindowSize ? null : (
            <>
              {openedWidget === false ? <Advertisement /> : <EventWidget id={id} detailPage={false} subPanel={false} />}
            </>
          )}
        </Flex>
        <Footer />
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { res } = context

  const formattingDate = () => {
    const format = new Date()
    format.setHours(format.getHours() + 2) //prilagodba datuma našoj vremenskoj zoni
    const formatIso = format.toISOString().split('T')[0]
    return formatIso
  }

  const today = formattingDate()
  try {
    //@ts-ignore
    const selSlug = 'football'

    const resp = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const details: SportInfo[] = await resp.json()

    const sports: SportInfo[] = details

    const resp2 = await fetch('https://academy-backend.sofascore.dev/sport/football/tournaments')

    const details2: Leagues[] = await resp2.json()

    const leagues: Leagues[] = details2

    const resp3 = await fetch(`https://academy-backend.sofascore.dev/sport/${selSlug}/events/${today}`)

    const detail: SportDateEvent[] = await resp3.json()

    const events: SportDateEvent[] = detail

    const date = formattingDate()
    console.log(date)
    return {
      props: { selSlug, sports, leagues, events, date },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
