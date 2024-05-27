import { Box, Flex } from '@kuma-ui/core'
import { SportDateEvent } from '@/model/events'
import { GetServerSideProps } from 'next'
import { Header } from '@/modules/Header'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { Leagues, SportInfo } from '@/model/sports'
import { LeaguesPanel } from '@/modules/Leagues'
import { EventList } from '@/modules/Event/EventList'
import { EventWidget } from '@/modules/Details Event/EventWidget'
import Footer from '@/modules/Footer'
import Head from 'next/head'
import { useSlugContext } from '@/context/SlugContext'
import { setTitle } from '@/utils/setTitle'
import { useState } from 'react'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { Advertisement } from '@/modules/Advertisement'

export default function DateEvent(props: {
  events: SportDateEvent[]
  selectedSport: string
  sports: SportInfo[]
  leagues: Leagues[]
  selSLug: string
  selDate: string
}) {
  const { mobileWindowSize } = useWindowSizeContext()
  const { slug } = useSlugContext()
  const { openedWidget } = useWidgetContext()

  const [id, setId] = useState<number | undefined>(undefined)

  const openWidget = (id: number) => {
    setId(id)
  }

  return (
    <>
      <Head>
        <title>{setTitle(slug)}</title>
      </Head>
      <Box as="main" minHeight="100vh" position="relative">
        <Header selectedSport={props.selectedSport} sports={props.sports} homePage={true} />
        <Box h="48px" w="100%"></Box>
        <Flex justifyContent="center" gap="24px" paddingBottom="130px">
          {mobileWindowSize ? null : (
            <LeaguesPanel selectedSport={props.selSLug} leagues={props.leagues} selLeagueId={undefined} />
          )}
          <EventList
            leagues={props.leagues}
            selSlug={props.selSLug}
            data={props.events}
            date={props.selDate}
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
  //console.log(params?.date)

  try {
    //@ts-ignore
    const selDate = params?.date
    console.log(selDate)
    const selSlug = params?.sportName
    console.log(selSlug)

    const res = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const detail: SportInfo[] = await res.json()

    const sports: SportInfo[] = detail

    const resp = await fetch(`https://academy-backend.sofascore.dev/sport/${selSlug}/events/${selDate}`)

    const details: SportDateEvent[] = await resp.json()

    const events: SportDateEvent[] = details

    const resp2 = await fetch(`https://academy-backend.sofascore.dev/sport/${selSlug}/tournaments`)

    const details2: Leagues[] = await resp2.json()

    const selectedSport = details2[0].sport.name

    const leagues: Leagues[] = details2

    return {
      props: { events, selectedSport, sports, selSlug, leagues, selDate },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
