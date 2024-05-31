//import { useThemeContext } from '@/context/ThemeContext'
//import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { Box, Flex, Text, VStack } from '@kuma-ui/core'
//import { useRouter } from 'next/router'

// eslint-disable-next-line no-unused-vars
export function TabNoIcon(props: { name: string; selectedName: string | null; setSelectName: (data: string) => void }) {
  //const router = useRouter()

  //const { mobileWindowSize } = useWindowSizeContext()
  //const { isDark } = useThemeContext()

  /*const changeRoute = (slug: string) => {
    if (slug != 'football') router.push(`/${slug}`)
    else router.push('/')
  }*/

  return (
    <VStack>
      <Flex
        cursor="pointer"
        h="100%"
        w="fit-content"
        padding="16px 10px"
        justify="center"
        alignItems="center"
        gap="4px"
        onClick={() => {
          props.setSelectName(props.name)
          //changeRoute(props.slug)
        }}
      >
        <Text
          fontSize="14px"
          color={`${props.selectedName !== null && props.selectedName === props.name ? 'var(--color-primary-default)' : 'var(--on-surface-on-surface-lv-2)'}`}
        >
          {props.name}
        </Text>
      </Flex>
      {props.selectedName !== null && props.selectedName === props.name ? (
        <Box minWidth="100%" h="4px" backgroundColor="var(--color-primary-default)" borderRadius="2px"></Box>
      ) : (
        <Box
          minWidth="100%"
          h="4px"
          backgroundColor="var(--surface-surface-1)"
          borderRadius="2px"
          visibility="hidden"
        ></Box>
      )}
    </VStack>
  )
}
