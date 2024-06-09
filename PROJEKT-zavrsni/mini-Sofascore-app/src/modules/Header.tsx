import { SportInfo } from '@/model/sports'
import { Box, Flex, Input, Link, VStack } from '@kuma-ui/core'
import logo1 from '../../public/images/sofascore_lockup@2x.png'
import logo2 from '../../public/images/sofascore_lockup_black@2x.png'
import settings1 from '../../public/images/ic_settings@2x.png'
import settings2 from '../../public/images/ic_settingsDark.png'
import bell1 from '../../public/images/bell.png'
import bell2 from '../../public/images/bellDark.png'
import trophy1 from '../../public/images/ic_trophy.png'
import trophy2 from '../../public/images/ic_trophyDark.png'
import matches1 from '../../public/images/icon_matches.png'
import matches2 from '../../public/images/icon_matchesDark.png'
import search from '../../public/images/search.png'
import searchLight from '../../public/images/searchLight.png'
import Image from 'next/image'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { useThemeContext } from '@/context/ThemeContext'
import { TabIcon } from '@/components/TabIcon'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { SetStateAction, useState } from 'react'
import { Search } from './Search'

export function Header(props: {
  selectedSport: string | null
  sports: SportInfo[] | null
  leagues?: boolean
  settingsFav?: boolean
}) {
  const { mobileWindowSize } = useWindowSizeContext()
  const { isDark } = useThemeContext()
  const { setOpenedWidget } = useWidgetContext()

  const closeWidget = () => {
    setOpenedWidget(false)
  }

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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
          <Box
            p="12px"
            cursor="pointer"
            onClick={() => {
              setSearchQuery('')
              setSearchOpen(!searchOpen)
            }}
          >
            <Image
              src={isDark ? (searchOpen ? searchLight : search) : searchOpen ? search : searchLight}
              alt="icon settings"
              width={18}
              height={18}
            ></Image>
          </Box>
          <Link href={'/favourites'}>
            <Box
              p="12px"
              cursor="pointer"
              onClick={() => {
                closeWidget()
              }}
            >
              <Image src={isDark ? bell2 : bell1} alt="icon settings" width={19} height={19}></Image>
            </Box>
          </Link>
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

      {searchOpen ? (
        <Flex w="100%" justify="center" alignItems="center" p="10px 0px" gap="10px">
          <Image src={isDark ? search : searchLight} alt="search icon" width={18} height={18}></Image>
          <Flex
            w={`${mobileWindowSize ? '300px' : '500px'}`}
            h="30px"
            alignItems="center"
            overflow="hidden"
            borderRadius="8px"
            position="relative"
          >
            <Input
              w="100%"
              placeholder="Search..."
              border="none"
              h="100%"
              backgroundColor="var(--surface-surface-1)"
              _focus={{ outline: 'none' }}
              p="0px 5px"
              fontSize="14px"
              color="var(--on-surface-on-surface-lv-1)"
              value={searchQuery}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchQuery(e.target.value)}
            ></Input>
          </Flex>
        </Flex>
      ) : null}

      {searchQuery.length >= 2 && searchOpen ? (
        <Flex w="100%" justify="center" alignItems="center">
          <Flex w={`${mobileWindowSize ? '300px' : '500px'}`} position="relative">
            <Search searchQuery={searchQuery} />
          </Flex>
        </Flex>
      ) : null}

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
