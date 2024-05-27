import { Panel } from '@/components/Panel'
import { useThemeContext } from '@/context/ThemeContext'
import { SportInfo } from '@/model/sports'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { Box, Button, Flex, VStack, Text } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

export default function Settings(props: { sports: SportInfo[] }) {
  const { isDark, setIsDark } = useThemeContext()
  return (
    <>
      <Head>
        <title>Settings⚙️ | Sofascore</title>
      </Head>
      <Header selectedSport={'football'} sports={props.sports} homePage={true} />
      <Box h="48px" w="100%"></Box>
      <Panel>
        <Box p="20px 16px" fontSize="20px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
          Settings
        </Box>
        <VStack>
          <Box p="20px 16px" fontSize="20px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
            Settings
          </Box>
          <Flex></Flex>
        </VStack>
      </Panel>
      <Flex justifyContent="center">
        <VStack
          minWidth="40%"
          borderRadius="16px"
          bgColor="var(--surface-surface-1)"
          boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
          p="16px 0px"
          gap="16px"
          alignItems="center"
        >
          <Box p="10px 16px" fontSize="20px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
            Theme
          </Box>
          <Text color="var(--on-surface-on-surface-lv-1)">Current theme: {isDark ? 'dark' : 'light'}</Text>
          <Button
            w="fit-content"
            bgColor="var(--color-primary-variant)"
            color="var(--surface-surface-1)"
            onClick={() => setIsDark(false)}
          >
            Light Theme
          </Button>
          <Button
            w="fit-content"
            bgColor="var(--color-primary-variant)"
            color="var(--surface-surface-1)"
            onClick={() => setIsDark(true)}
          >
            Dark Theme
          </Button>
        </VStack>
      </Flex>

      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { res } = context
  //console.log(params?.date)

  try {
    //@ts-ignore

    const res = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const detail: SportInfo[] = await res.json()

    const sports: SportInfo[] = detail

    return {
      props: { sports },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
