import { LinkingBox } from '@/components/LinkingBox'
import { useSlugContext } from '@/context/SlugContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { SportDateEvent } from '@/model/events'
import { LinkingDetails } from '@/model/linking'
import { Leagues, SportInfo } from '@/model/sports'
import { Advertisement } from '@/modules/Advertisement'
import { EventWidget } from '@/modules/Details Event/EventWidget'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { LeaguesPanel } from '@/modules/Leagues'
import { formatName } from '@/utils/formatPathName'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Match(props: {
  leagues: Leagues[]
  sports: SportInfo[]
  matchId: number
  data: SportDateEvent
  selSlug: string
}) {
  const { mobileWindowSize } = useWindowSizeContext()
  const { setSlug } = useSlugContext()
  const [linkingData, setLinkingData] = useState<LinkingDetails[]>([])

  useEffect(() => {
    setSlug(props.selSlug)
  }, [props.selSlug])

  useEffect(() => {
    const slLink: LinkingDetails = {
      name: `${props.sports.find(({ slug }) => slug === props.selSlug)?.name}`,
      urlLink: `/${props.selSlug !== 'football' ? `${props.selSlug}` : ''}`,
    }
    const tourLink: LinkingDetails = {
      name: `${props.data.tournament.name}`,
      urlLink: `/tournament/${props.selSlug}/${props.data.tournament.name}`,
    }
    const matchLink: LinkingDetails = {
      name: `${props.data.homeTeam.name} vs ${props.data.awayTeam.name}`,
      urlLink: `/tournament/${props.selSlug}/${props.data.tournament.name}/${formatName(props.data.homeTeam.name, props.data.awayTeam.name)}/${props.matchId}`,
    }
    setLinkingData([slLink, tourLink, matchLink])
  }, [])

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
          <Flex h="48px" w="100%" alignItems="center">
            <LinkingBox data={linkingData} />
          </Flex>
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
