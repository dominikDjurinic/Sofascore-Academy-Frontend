import { SportInfo } from '@/model/sports'
import { Header } from '@/modules/Header'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import { redirect } from 'next/navigation'
import Footer from '@/modules/Footer'
import { useEffect } from 'react'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { LeaguesPanel } from '@/modules/Leagues'

export default function Sports(props: { selectedSport: string; sports: SportInfo[]; selSlug: string }) {
  const { mobileWindowSize } = useWindowSizeContext()

  useEffect(() => {
    document.title = 'Sofascore - ' + props.selectedSport
  }, [props.selectedSport])

  return (
    <>
      <Box as="main">
        <Header selectedSport={props.selectedSport} sports={props.sports} homePage={true} />
        <Box h="48px" w="100%"></Box>
        <Flex justifyContent="center">
          {mobileWindowSize ? (
            <Box as="h1" color="colors.primary">
              Ja sam mobile version of app!
            </Box>
          ) : (
            <LeaguesPanel selectedSport={props.selSlug} />
          )}
        </Flex>
        <Footer />
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params, res } = context

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

    return {
      props: { selectedSport, sports, selSlug },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
