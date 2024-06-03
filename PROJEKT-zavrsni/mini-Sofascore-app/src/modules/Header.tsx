import { SportInfo } from '@/model/sports'
import { Box, Flex, Link, VStack } from '@kuma-ui/core'
import logo1 from '../../public/images/sofascore_lockup@2x.png'
import logo2 from '../../public/images/sofascore_lockup_black@2x.png'
import settings1 from '../../public/images/ic_settings@2x.png'
import settings2 from '../../public/images/ic_settingsDark.png'
import trophy1 from '../../public/images/ic_trophy.png'
import trophy2 from '../../public/images/ic_trophyDark.png'
import matches1 from '../../public/images/icon_matches.png'
import matches2 from '../../public/images/icon_matchesDark.png'
import Image from 'next/image'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { useThemeContext } from '@/context/ThemeContext'
import { TabIcon } from '@/components/TabIcon'
import { useWidgetContext } from '@/context/OpenedWidgetContext'

export function Header(props: { selectedSport: string | null; sports: SportInfo[] | null; leagues?: boolean }) {
  const { mobileWindowSize } = useWindowSizeContext()
  const { isDark } = useThemeContext()
  const { setOpenedWidget } = useWidgetContext()

  const closeWidget = () => {
    setOpenedWidget(false)
  }

  return (
    <VStack
      alignItems={'center'}
      bgColor="var(--color-primary-default)"
      position="sticky"
      top="0px"
      w="100%"
      zIndex="4"
    >
      <Flex
        justify={`${mobileWindowSize ? 'left' : 'center'}`}
        w="100%"
        h="64px"
        alignItems="center"
        position="relative"
        paddingLeft={`${mobileWindowSize ? '16px' : '0px'}`}
      >
        <Link href={'/'}>
          <Box
            cursor="pointer"
            w="fit-content"
            h="fit-content"
            onClick={() => {
              closeWidget()
            }}
          >
            <Image src={isDark ? logo2 : logo1} alt="logo icon" width={132} height={20}></Image>
          </Box>
        </Link>
        <Flex right="4px" position="absolute" alignItems="center">
          {mobileWindowSize && props.selectedSport !== '' ? (
            props.leagues !== undefined ? (
              <Link href={`/${props.selectedSport === 'football' ? '' : props.selectedSport}`}>
                <Box p="12px" cursor="pointer">
                  <Image src={isDark ? matches2 : matches1} alt="icon matches" width={21} height={21}></Image>
                </Box>
              </Link>
            ) : (
              <Link href={`/leagues/${props.selectedSport}`}>
                <Box p="12px" cursor="pointer">
                  <Image src={isDark ? trophy2 : trophy1} alt="icon trophy" width={24} height={24}></Image>
                </Box>
              </Link>
            )
          ) : null}
          <Link href={'/settings'}>
            <Box
              p="12px"
              cursor="pointer"
              onClick={() => {
                closeWidget()
              }}
            >
              <Image src={isDark ? settings2 : settings1} alt="icon settings" width={24} height={24}></Image>
            </Box>
          </Link>
        </Flex>
      </Flex>
      {props.selectedSport !== null && props.sports !== null ? (
        <Flex justify={'center'} alignItems={'center'} h="fit-content" color="var(--surface-surface-1)">
          {props.sports.map(({ name, slug, id }) => (
            <TabIcon
              key={name}
              name={name}
              slug={slug}
              id={id}
              selectedSport={props.selectedSport}
              leagues={props.leagues}
            />
          ))}
        </Flex>
      ) : null}
    </VStack>
  )
}
