import { useThemeContext } from '@/context/ThemeContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { Flex, Text } from '@kuma-ui/core'
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
    <Flex
      cursor="pointer"
      h="100%"
      w="fit-content"
      p="16px 8px"
      justify="center"
      alignItems="center"
      gap="4px"
      borderBottom={`${props.selectedSport !== null && props.selectedSport === props.name ? '4px solid var(--surface-surface-1)' : '4px solid var(--color-primary-default)'}`}
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
  )
}
