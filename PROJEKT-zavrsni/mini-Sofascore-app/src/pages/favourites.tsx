import { useSlugContext } from '@/context/SlugContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { SportDateEvent } from '@/model/events'
import { Leagues, SportInfo } from '@/model/sports'
import { EventWidget } from '@/modules/Details Event/EventWidget'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { LeaguesPanel } from '@/modules/Leagues'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { Advertisement } from '@/modules/Advertisement'
import { LinkingBox } from '@/components/LinkingBox'
import { LinkingDetails } from '@/model/linking'
import { FavouritesPanel } from '@/modules/Favorites/FavoritesPanel'

export default function Favourites(props: {
  selSlug: string
  sports: SportInfo[]
  leagues: Leagues[]
  events: SportDateEvent[]
  date: string
}) {
  const { mobileWindowSize } = useWindowSizeContext()
  const { setSlug } = useSlugContext()
  const { openedWidget } = useWidgetContext()

  useEffect(() => {
    setSlug(props.selSlug)
  }, [props.selSlug])

  const [id, setId] = useState<number | undefined>(undefined)
  const [linkingData, setLinkingData] = useState<LinkingDetails[]>([])

  const openWidget = (id: number) => {
    setId(id)
  }

  useEffect(() => {
    setLinkingData([])
  }, [])

  return (
    <>
      <Head>
        <title>Favourites | Sofascore</title>
      </Head>
      {mobileWindowSize !== undefined ? (
        <Box as="main" position="relative" minHeight="100vh">
          <Header selectedSport={''} sports={props.sports} />
          {mobileWindowSize ? null : (
            <Flex h="48px" w="100%" alignItems="center">
              <LinkingBox data={linkingData} />
            </Flex>
          )}
          <Flex justifyContent="center" gap="24px" paddingBottom="130px">
            {mobileWindowSize ? null : <LeaguesPanel leagues={props.leagues} selLeagueId={undefined} />}
            <FavouritesPanel id={openWidget} setLinkData={(data: LinkingDetails[]) => setLinkingData(data)} />
            {mobileWindowSize ? null : (
              <>
                {openedWidget === false ? (
                  <Advertisement />
                ) : (
                  <EventWidget id={id} detailPage={false} subPanel={false} selSlug={props.selSlug} />
                )}
              </>
            )}
          </Flex>
          <Footer />
        </Box>
      ) : null}
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
    return {
      props: { selSlug, sports, leagues, events, date },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
