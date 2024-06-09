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
import { LinkingDetails } from '@/model/linking'
import { LinkingBox } from '@/components/LinkingBox'

export default function Sports(props: {
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
  const [linkingData, setLinkingData] = useState<LinkingDetails[]>([])
  const [id, setId] = useState<number | undefined>(undefined)

  const slLink: LinkingDetails = {
    name: `${props.sports.find(({ slug }) => slug === props.selSlug)?.name}`,
    urlLink: `/${props.selSlug !== 'football' ? `${props.selSlug}` : ''}`,
  }

  useEffect(() => {
    setSelectedSlug(props.selSlug)
    setSlug(props.selSlug)

    setLinkingData([slLink])
  }, [props.selSlug])

  const openWidget = (id: number) => {
    setId(id)
  }

  return (
    <>
      <Head>
        <title>{setTitle(slug)}</title>
      </Head>
      {mobileWindowSize !== undefined ? (
        <Box as="main" position="relative" minHeight="100vh">
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
              selSlug={selectedSlug}
              data={props.events}
              date={props.date}
              id={openWidget}
              setLinkData={(data: LinkingDetails[]) => setLinkingData([slLink].concat(data))}
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

    const sports: SportInfo[] = details

    const resp2 = await fetch(`https://academy-backend.sofascore.dev/sport/${sportName}/tournaments`)

    const details2: Leagues[] = await resp2.json()

    const leagues: Leagues[] = details2

    const resp3 = await fetch(`https://academy-backend.sofascore.dev/sport/${selSlug}/events/${today}`)

    const detail: SportDateEvent[] = await resp3.json()

    const events: SportDateEvent[] = detail

    const date = formattingDate()

    return {
      props: { sports, selSlug, leagues, events, date },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
