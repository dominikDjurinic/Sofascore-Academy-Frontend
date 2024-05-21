import { useThemeContext } from '@/context/ThemeContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { Box, Flex, Text, VStack } from '@kuma-ui/core'
import { useRouter } from 'next/router'
import Image from 'next/image'

export function TabIcon(props: { name: string; slug: string; id: number; selectedSport: string | null }) {
  const router = useRouter()

  const { mobileWindowSize } = useWindowSizeContext()
  const { isDark } = useThemeContext()

  const changeRoute = (slug: string) => {
    if (slug != 'football') router.push(`/${slug}`)
    else router.push('/')
  }

  const sportsIcons = [
    {
      name: 'football',
      image: '/images/football.png',
      imageDark: '/images/icon_footballDark.png',
    },
    {
      name: 'basketball',
      image: '/images/basketball.png',
      imageDark: '/images/icon_basketballDark.png',
    },
    {
      name: 'american-football',
      image: '/images/american-football.png',
      imageDark: '/images/icon_american_footballDark.png',
    },
  ]

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
        onClick={() => changeRoute(props.slug)}
        flexDirection={`${mobileWindowSize ? 'column' : 'row'}`}
      >
        <Image
          src={isDark ? sportsIcons[props.id - 1].imageDark : sportsIcons[props.id - 1].image}
          alt="logo Sport"
          width={16}
          height={16}
        ></Image>
        <Text>{props.name}</Text>
      </Flex>
      {props.selectedSport !== null && props.selectedSport === props.name ? (
        <Box minWidth="100%" h="4px" backgroundColor="var(--surface-surface-1)" borderRadius="2px"></Box>
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
