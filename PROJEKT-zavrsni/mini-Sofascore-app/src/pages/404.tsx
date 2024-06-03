import { Button, Heading, VStack } from '@kuma-ui/core'
import Head from 'next/head'
import { Header } from '@/modules/Header'
import Link from 'next/link'

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 Error</title>
      </Head>
      <Header selectedSport={''} sports={[]} />
      <VStack h="90vh" alignItems="center" justify="center" gap="50px">
        <Heading as="h1">404 - Page Not Found</Heading>
        <Link href={'/'}>
          <Button border="none" bgColor="#374df5" color="white" p="10px" _hover={{ bgColor: 'gray' }}>
            Go back to home page
          </Button>
        </Link>
      </VStack>
    </>
  )
}
