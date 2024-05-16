import { SportInfo } from '@/model/sports'
import { Box, Flex, VStack, Text } from '@kuma-ui/core'
import logo1 from '../../public/images/sofascore_lockup@2x.png'
import logo2 from '../../public/images/sofascore_lockup_black@2x.png'
import settings from '../../public/images/ic_settings@2x.png'
import trophy from '../../public/images/ic_trophy.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { useThemeContext } from '@/context/ThemeContext'

export function Header(props: { selectedSport: string; sports: SportInfo[] }) {
  const { mobileWindowSize } = useWindowSizeContext()
  const { isDark } = useThemeContext()

  const router = useRouter()

  const changeRoute = (slug: string) => {
    if (slug != 'football') router.push(`/${slug}`)
    else router.push('/')
  }

  const homeRoute = () => {
    router.push('/')
  }

  const sportsIcons = [
    {
      name: 'football',
      image: '/images/football.png',
    },
    {
      name: 'basketball',
      image: '/images/basketball.png',
    },
    {
      name: 'american-football',
      image: '/images/american-football.png',
    },
  ]

  return (
    <VStack alignItems={'center'} bgColor="var(--color-primary-default)" position="sticky" top="0px">
      <Flex
        justify={`${mobileWindowSize ? 'left' : 'center'}`}
        w="100%"
        h="64px"
        alignItems="center"
        position="relative"
        paddingLeft={`${mobileWindowSize ? '16px' : '0px'}`}
      >
        <Box cursor="pointer" w="fit-content" h="fit-content" onClick={() => homeRoute()}>
          <Image src={isDark ? logo2 : logo1} alt="logo icon" width={132} height={20}></Image>
        </Box>
        <Flex right="4px" position="absolute">
          {mobileWindowSize ? (
            <Box p="12px" cursor="pointer">
              <Image src={trophy} alt="icon trophy" width={24} height={24}></Image>
            </Box>
          ) : null}
          <Box p="12px" cursor="pointer">
            <Image src={settings} alt="icon settings" width={24} height={24}></Image>
          </Box>
        </Flex>
      </Flex>
      {mobileWindowSize ? null : (
        <Flex justify={'center'} alignItems={'center'} h="64px" color="var(--surface-surface-1)">
          {props.sports.map(({ name, slug, id }) =>
            props.selectedSport === name ? (
              <Flex
                key={name}
                cursor="pointer"
                h="100%"
                w="fit-content"
                p="16px 8px"
                justify="center"
                alignItems="center"
                gap="4px"
                borderBottom="4px solid var(--surface-surface-1)"
                onClick={() => changeRoute(slug)}
              >
                <Image src={sportsIcons[id - 1].image} alt="logo Sport" width={16} height={16}></Image>
                <Text>{name}</Text>
              </Flex>
            ) : (
              <Flex
                key={name}
                cursor="pointer"
                h="100%"
                w="fit-content"
                p="16px 8px"
                justify="center"
                alignItems="center"
                gap="4px"
                borderBottom="4px solid var(--color-primary-default)"
                onClick={() => changeRoute(slug)}
              >
                <Image src={sportsIcons[id - 1].image} alt="logo Sport" width={16} height={16}></Image>
                <Text>{name}</Text>
              </Flex>
            )
          )}
        </Flex>
      )}
    </VStack>
  )
}
