import { SportInfo } from '@/model/sports'
import { Box, Flex, VStack } from '@kuma-ui/core'
import logo1 from '../../public/images/sofascore_lockup@2x.png'
import logo2 from '../../public/images/sofascore_lockup_black@2x.png'
import settings1 from '../../public/images/ic_settings@2x.png'
import settings2 from '../../public/images/ic_settingsDark.png'
import trophy1 from '../../public/images/ic_trophy.png'
import trophy2 from '../../public/images/ic_trophyDark.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { useThemeContext } from '@/context/ThemeContext'
import { TabIcon } from '@/components/TabIcon'

export function Header(props: { selectedSport: string | null; sports: SportInfo[] | null; homePage: boolean }) {
  const { mobileWindowSize } = useWindowSizeContext()
  const { isDark } = useThemeContext()

  const router = useRouter()

  const homeRoute = () => {
    router.push('/')
  }

  const changeRoute = (path: string) => {
    router.push(`/${path}`)
  }

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
              <Image src={isDark ? trophy2 : trophy1} alt="icon trophy" width={24} height={24}></Image>
            </Box>
          ) : null}
          <Box p="12px" cursor="pointer" onClick={() => changeRoute('settings')}>
            <Image src={isDark ? settings2 : settings1} alt="icon settings" width={24} height={24}></Image>
          </Box>
        </Flex>
      </Flex>
      {props.homePage && props.selectedSport !== null && props.sports !== null ? (
        <Flex justify={'center'} alignItems={'center'} h="64px" color="var(--surface-surface-1)">
          {props.sports.map(({ name, slug, id }) => (
            <TabIcon key={name} name={name} slug={slug} id={id} selectedSport={props.selectedSport} />
          ))}
        </Flex>
      ) : null}
    </VStack>
  )
}
