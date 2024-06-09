import { useThemeContext } from '@/context/ThemeContext'
import { Flex, VStack, Text, Box } from '@kuma-ui/core'
import Image from 'next/image'
import left from '../../../public/images/ic_left.png'
import leftLight from '../../../public/images/ic_leftLight.png'
import right from '../../../public/images/IconBlueRight@2x.png'
import rightLight from '../../../public/images/IconBlueRightLight@2x.png'
import rightTriangle from '../../../public/images/ic_pointer_right@2x.png'
import rightLightTriangle from '../../../public/images/ic_pointer_rightLight@2x.png'
import bellNoclick from '../../../public/images/bellNotClicked.png'
import bellClicked from '../../../public/images/belClicked.png'
import bellClickedLight from '../../../public/images/belClickedLight.png'
import { useEffect, useState } from 'react'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { EventCell } from './EventCell'
import { FavouriteEvent } from '@/model/favorites'
import { fullDaysInWeek } from '@/model/daysInWeek'
import { settingFavourites } from '@/utils/settingFavourites'
import { TournamentDetails } from '@/model/tournaments'
import { LinkingDetails } from '@/model/linking'

// eslint-disable-next-line no-unused-vars
export function FavouritesPanel(props: { id: (id: number) => void; setLinkData: (data: LinkingDetails[]) => void }) {
  const { isDark } = useThemeContext()
  const { mobileWindowSize } = useWindowSizeContext()

  const [span, setSpan] = useState('next')
  const [page, setPage] = useState(0)
  const [prevSpan, setPrevSpan] = useState('next')
  const [prevPage, setPrevPage] = useState(0)
  const [prevDate, setPrevDate] = useState<Date | undefined>()
  const { openedWidget, setOpenedWidget } = useWidgetContext()
  const [selectedCell, setSelectedCell] = useState<number>(0)
  const [favouriteGroup, setFavouriteGroup] = useState<string>('currentFavouritesMiniSofa')

  const [newFavourites, setNewFavourites] = useState<FavouriteEvent[]>([])

  useEffect(() => {
    const favourites = localStorage.getItem('currentFavouritesMiniSofa')
    if (favourites !== null) {
      setNewFavourites(JSON.parse(favourites))
    } else {
      setNewFavourites([])
    }
  }, [])

  useEffect(() => {
    const favourites = localStorage.getItem(favouriteGroup)
    if (favourites !== null) {
      setNewFavourites(JSON.parse(favourites))
    } else {
      setNewFavourites([])
    }
  }, [favouriteGroup])

  useEffect(() => {
    localStorage.setItem(favouriteGroup, JSON.stringify(newFavourites))
  }, [newFavourites])

  const favouritesHandle = (
    favourites: FavouriteEvent[],
    eventId: number,
    date: Date,
    tournament: TournamentDetails
  ) => {
    console.log(favourites)
    setNewFavourites(settingFavourites(favourites, eventId, date, tournament))
  }

  const favouritesGroupHandle = (btnClicked: string) => {
    switch (favouriteGroup) {
      case 'currentFavouritesMiniSofa':
        if (btnClicked === 'next') {
          return 'nextFavouritesMiniSofa'
        } else {
          return 'previousFavouritesMiniSofa'
        }
      case 'nextFavouritesMiniSofa':
        return 'currentFavouritesMiniSofa'
      case 'previousFavouritesMiniSofa':
        return 'currentFavouritesMiniSofa'
      default:
        return 'currentFavouritesMiniSofa'
    }
  }

  const nextMatchesPage = (nextLast: string) => {
    let newPage: number
    if (nextLast === 'next') {
      if (prevSpan === 'last') {
        if (prevPage === 0) {
          setPrevSpan('next')
          setSpan('next')
        } else {
          newPage = prevPage + 1
          setPrevPage(newPage)
          setPage(Math.abs(newPage))
        }
      } else {
        newPage = prevPage + 1
        setPrevPage(newPage)
        setPage(newPage)
      }
    } else {
      if (prevSpan === 'next') {
        if (prevPage === 0) {
          setPrevSpan('last')
          setSpan('last')
        } else {
          newPage = prevPage - 1
          setPrevPage(newPage)
          setPage(newPage)
        }
      } else {
        newPage = prevPage - 1
        setPrevPage(newPage)
        setPage(Math.abs(newPage))
      }
    }
  }

  let dateDay: Date | undefined = undefined
  const diffDateDay = (newDate: Date) => {
    if (dateDay === undefined) {
      dateDay = newDate
      return true
    } else if (
      new Date(newDate).getDate() !== new Date(dateDay).getDate() &&
      (new Date(newDate).getMonth() >= new Date(dateDay).getMonth() ||
        new Date(newDate).getMonth() < new Date(dateDay).getMonth())
    ) {
      dateDay = newDate
      return true
    } else {
      return false
    }
  }

  return (
    <VStack
      w={`${mobileWindowSize ? '100%' : '30%'}`}
      borderRadius={`${mobileWindowSize ? '0px' : '16px'}`}
      bgColor="var(--surface-surface-1)"
      boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
      paddingBottom="16px"
      overflow="hidden"
      height="fit-content"
    >
      <Flex justify="space-between" alignItems="center" p="10px 10px">
        <Flex
          w="110px"
          m="8px"
          cursor="pointer"
          p="10px 16px"
          bgColor="var(--surface-surface-1)"
          justifyContent="center"
          alignItems="center"
          border="solid 2px var(--color-primary-default)"
          borderRadius="2px"
          color="var(--color-primary-default)"
          visibility={`${
            favouriteGroup === 'currentFavouritesMiniSofa' || favouriteGroup === 'nextFavouritesMiniSofa'
              ? 'visible'
              : 'hidden'
          }`}
          onClick={() => setFavouriteGroup(favouritesGroupHandle('previous'))}
        >
          <Image src={isDark ? leftLight : left} alt="iconLeft" width={14} height={14} priority></Image>
          <Text>Previous</Text>
        </Flex>
        <Text color="var(--on-surface-on-surface-lv-1)" fontSize="16px" fontWeight="bold">
          Favourites
        </Text>
        <Flex
          w="110px"
          m="8px"
          cursor="pointer"
          p="10px 16px"
          bgColor="var(--surface-surface-1)"
          justifyContent="center"
          alignItems="center"
          border="solid 2px var(--color-primary-default)"
          borderRadius="2px"
          color="var(--color-primary-default)"
          visibility={`${
            favouriteGroup === 'currentFavouritesMiniSofa' || favouriteGroup === 'previousFavouritesMiniSofa'
              ? 'visible'
              : 'hidden'
          }`}
          onClick={() => setFavouriteGroup(favouritesGroupHandle('next'))}
        >
          <Text>Next</Text>
          <Image src={isDark ? rightLight : right} alt="iconRight" width={14} height={14} priority></Image>
        </Flex>
      </Flex>

      {newFavourites.length === 0 ? (
        <Text>No favourites</Text>
      ) : (
        newFavourites.map(({ id, date, tournament }) => (
          <Box key={id}>
            {diffDateDay(date) ? (
              new Date(date).getDate() === new Date().getDate() &&
              new Date(date).getMonth() === new Date().getMonth() ? (
                <Flex p="20px 16px" fontSize="14px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
                  <Text>
                    Today -{' '}
                    {new Date(date).getDate() +
                      '. ' +
                      (new Date(date).getMonth() + 1) +
                      '. ' +
                      new Date(date).getFullYear() +
                      '.'}
                  </Text>
                </Flex>
              ) : (
                <Flex p="20px 16px" fontSize="14px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
                  <Text>
                    {fullDaysInWeek[new Date(date).getDay()]} -{' '}
                    {new Date(date).getDate() +
                      '. ' +
                      (new Date(date).getMonth() + 1) +
                      '. ' +
                      new Date(date).getFullYear() +
                      '.'}
                  </Text>
                </Flex>
              )
            ) : null}
            <VStack>
              <Flex
                alignItems="center"
                fontSize="14px"
                gap="10px"
                p="20px 16px"
                color="var(--on-surface-on-surface-lv-1)"
              >
                <Image src={`/api/tournament/${tournament.id}/image`} alt="league logo" width={32} height={32}></Image>
                <Text>{tournament.sport.name}</Text>
                <Image
                  src={isDark ? rightLightTriangle : rightTriangle}
                  alt="icon right"
                  width={15}
                  height={15}
                ></Image>
                <Text color="var(--on-surface-on-surface-lv-2)">{tournament.country.name}</Text>
                <Image
                  src={isDark ? rightLightTriangle : rightTriangle}
                  alt="icon right"
                  width={15}
                  height={15}
                ></Image>
                <Text color="var(--on-surface-on-surface-lv-2)">{tournament.name}</Text>
              </Flex>

              <Flex
                width="100%"
                position="relative"
                alignItems="center"
                _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
                backgroundColor={`${
                  selectedCell === id && openedWidget ? 'var(--color-primary-highlight)' : 'inherit'
                }`}
              >
                <EventCell
                  key={id}
                  eventId={id}
                  openWidget={(data: boolean) => setOpenedWidget(data)}
                  openId={props.id}
                  selectedId={(id: number) => setSelectedCell(id)}
                  clickedCell={selectedCell}
                  setLinkData={props.setLinkData}
                />

                <Flex alignItems="center">
                  <Box
                    minWidth="1px"
                    h="40px"
                    backgroundColor="var(--on-surface-on-surface-lv-4)"
                    borderRadius="2px"
                  ></Box>
                  <Flex
                    position="absolute"
                    right="0px"
                    cursor="pointer"
                    onClick={() => favouritesHandle(newFavourites, id, new Date(date), tournament)}
                    alignItems="center"
                    justify="center"
                    w="10%"
                    gap="5px"
                  >
                    <Image
                      src={
                        newFavourites.find(({ id }) => id === id) !== undefined
                          ? isDark
                            ? bellClickedLight
                            : bellClicked
                          : bellNoclick
                      }
                      alt="bell icon"
                      width={19}
                      height={19}
                    ></Image>
                  </Flex>
                </Flex>
              </Flex>
            </VStack>
          </Box>
        ))
      )}
    </VStack>
  )
}
