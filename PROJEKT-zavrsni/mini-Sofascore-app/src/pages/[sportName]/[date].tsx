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
import { useState, useEffect } from 'react'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { Advertisement } from '@/modules/Advertisement'
import { LinkingDetails } from '@/model/linking'
import { LinkingBox } from '@/components/LinkingBox'

export default function DateEvent(props: {
  events: SportDateEvent[]
  sports: SportInfo[]
  leagues: Leagues[]
  selSlug: string
  selDate: string
}) {
  const { mobileWindowSize } = useWindowSizeContext()
  const { slug, setSlug } = useSlugContext()
  const { openedWidget } = useWidgetContext()

  const [linkingData, setLinkingData] = useState<LinkingDetails[]>([])
  const [id, setId] = useState<number | undefined>(undefined)

  const slLink: LinkingDetails = {
    name: `${props.sports.find(({ slug }) => slug === props.selSlug)?.name}`,
    urlLink: `/${props.selSlug !== 'football' ? `${props.selSlug}` : ''}`,
  }

  useEffect(() => {
    setSlug(props.selSlug)

    setLinkingData([slLink])
  }, [props.selSlug])

  const openWidget = (id: number) => {
    setId(id)
  }

  const settingLink = (data: LinkingDetails[]) => {
    setLinkingData([slLink].concat(data))
  }

  return (
    <>
      <Head>
        <title>{setTitle(slug)}</title>
      </Head>
      {mobileWindowSize !== undefined ? (
        <Box as="main" minHeight="100vh" position="relative">
          <Header selectedSport={props.selSlug} sports={props.sports} />
          {mobileWindowSize ? null : (
            <Flex h="48px" w="100%" alignItems="center" justify="center">
              <LinkingBox data={linkingData} />
              <Box w="30%"></Box>
              <Box w="30%"></Box>
            </Flex>
          )}
          <Flex justifyContent="center" gap="24px" paddingBottom="130px">
            {mobileWindowSize ? null : <LeaguesPanel leagues={props.leagues} selLeagueId={undefined} />}
            <EventList
              leagues={props.leagues}
              selSlug={props.selSlug}
              data={props.events}
              date={props.selDate}
              id={openWidget}
              setLinkData={settingLink}
            />
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

    const leagues: Leagues[] = details2

    return {
      props: { events, sports, selSlug, leagues, selDate },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
