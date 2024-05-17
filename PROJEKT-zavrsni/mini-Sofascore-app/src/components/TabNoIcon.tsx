import { Flex, Text } from '@kuma-ui/core'
import { useRouter } from 'next/router'

export function TabNoIcon(props: { name: string; path: string; id: number; selectedSport: string | null }) {
  const router = useRouter()

  const changeRoute = (path: string) => {
    router.push(`/${path}`)
  }

  return (
    <Flex
      cursor="pointer"
      h="100%"
      w="fit-content"
      p="16px 8px"
      justify="center"
      alignItems="center"
      gap="4px"
      borderBottom={`${props.selectedSport !== null && props.selectedSport === props.name ? '4px solid var(--surface-surface-1)' : 'none'}`}
      onClick={() => changeRoute(props.path)}
    >
      <Text>{props.name}</Text>
    </Flex>
  )
}
