import { useThemeContext } from '@/context/ThemeContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { Box, Flex, Text, VStack } from '@kuma-ui/core'
import Image from 'next/image'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import Link from 'next/link'

export function TabIcon(props: {
  name: string
  slug: string
  id: number
  selectedSport: string | null
  leagues?: boolean
}) {
  const { mobileWindowSize } = useWindowSizeContext()
  const { isDark } = useThemeContext()
  const { setOpenedWidget } = useWidgetContext()

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

  const closeWidget = () => {
    setOpenedWidget(false)
  }

  return (
    <VStack>
      <Link
        href={`${props.leagues !== undefined ? `/leagues/${props.slug}` : props.slug !== 'football' ? `/${props.slug}` : '/'}`}
      >
        <Flex
          cursor="pointer"
          h="100%"
          w="fit-content"
          padding="16px 10px"
          justify="center"
          alignItems="center"
          gap="4px"
          onClick={() => {
            closeWidget()
          }}
          flexDirection={`${mobileWindowSize ? 'column' : 'row'}`}
        >
          <Image
            src={isDark ? sportsIcons[props.id - 1].imageDark : sportsIcons[props.id - 1].image}
            alt="logo Sport"
            width={16}
            height={16}
          ></Image>
          <Text
            fontWeight={`${props.selectedSport !== null && props.selectedSport === props.slug ? 'bold' : 'normal'}`}
          >
            {props.name}
          </Text>
        </Flex>
      </Link>
      {props.selectedSport !== null && props.selectedSport === props.slug ? (
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
