import { Leagues, SportInfo } from '@/model/sports'
import { Header } from '@/modules/Header'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import { redirect } from 'next/navigation'
import Footer from '@/modules/Footer'
import { useEffect, useState } from 'react'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { LeaguesPanel } from '@/modules/Leagues'
import { EventList } from '@/modules/Event/EventList'
import { EventWidget } from '@/modules/Details Event/EventWidget'
import { SportDateEvent } from '@/model/events'
import { useSlugContext } from '@/context/SlugContext'
import Head from 'next/head'
import { setTitle } from '@/utils/setTitle'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { Advertisement } from '@/modules/Advertisement'

export default function Sports(props: {
  selectedSport: string
  sports: SportInfo[]
  selSlug: string
  leagues: Leagues[]
  events: SportDateEvent[]
  date: string
}) {
  const { mobileWindowSize } = useWindowSizeContext()
  const { slug, setSlug } = useSlugContext()
  const { openedWidget } = useWidgetContext()

  const [selectedSlug, setSelectedSlug] = useState(props.selSlug)

  useEffect(() => {
    setSelectedSlug(props.selSlug)
    setSlug(props.selSlug)
  }, [props.selectedSport])

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
        <Header selectedSport={props.selectedSport} sports={props.sports} homePage={true} />
        <Box h="48px" w="100%"></Box>
        <Flex justifyContent="center" gap="24px" paddingBottom="130px">
          {mobileWindowSize ? null : (
            <LeaguesPanel selectedSport={props.selSlug} leagues={props.leagues} selLeagueId={undefined} />
          )}
          <EventList
            leagues={props.leagues}
            selSlug={selectedSlug}
            data={props.events}
            date={props.date}
            id={openWidget}
          />
          {mobileWindowSize ? null : (
            <>{openedWidget === false ? <Advertisement /> : <EventWidget id={id} detailPage={false} />}</>
          )}
        </Flex>
        <Footer />
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params, res } = context
  const formattingDate = () => {
    const format = new Date()
    format.setHours(format.getHours() + 2) //prilagodba datuma našoj vremenskoj zoni
    const formatIso = format.toISOString().split('T')[0]
    return formatIso
  }

  const today = formattingDate()

  try {
    //@ts-ignore
    const { sportName } = params

    if (sportName === 'football') {
      redirect('/')
    }

    const resp = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const details: SportInfo[] = await resp.json()

    if (details.find(({ slug }) => slug === sportName) === undefined) {
      return { notFound: true }
    }

    const selSlug = details.find(({ slug }) => slug === sportName)?.slug
    let selectedSport = details.find(({ slug }) => slug === sportName)?.name

    const sports: SportInfo[] = details

    const resp2 = await fetch(`https://academy-backend.sofascore.dev/sport/${sportName}/tournaments`)

    const details2: Leagues[] = await resp2.json()

    const leagues: Leagues[] = details2

    const resp3 = await fetch(`https://academy-backend.sofascore.dev/sport/${selSlug}/events/${today}`)

    const detail: SportDateEvent[] = await resp3.json()

    const events: SportDateEvent[] = detail

    const date = formattingDate()

    return {
      props: { selectedSport, sports, selSlug, leagues, events, date },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
