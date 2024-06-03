import { Leagues, SportInfo } from '@/model/sports'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { LeaguesPanel } from '@/modules/Leagues'
import { Box, Flex } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

export default function LeaguesPage(props: {
  selSlug: string
  selectedSport: string
  sports: SportInfo[]
  leagues: Leagues[]
}) {
  return (
    <>
      <Head>
        <title>Leagues - {props.selectedSport}</title>
      </Head>
      <Box as="main" position="relative" minHeight="100vh">
        <Header selectedSport={props.selSlug} sports={props.sports} leagues={true} />
        <Flex justifyContent="center" gap="24px" paddingBottom="130px">
          <LeaguesPanel leagues={props.leagues} selLeagueId={undefined} />
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
    const selSlug = params?.sportName

    const resp = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const details: SportInfo[] = await resp.json()

    let selectedSport = details.find(({ slug }) => slug === selSlug)?.name

    const sports: SportInfo[] = details

    const resp2 = await fetch(`https://academy-backend.sofascore.dev/sport/${selSlug}/tournaments`)

    const details2: Leagues[] = await resp2.json()

    const leagues: Leagues[] = details2

    return {
      props: { selSlug, selectedSport, sports, leagues },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
