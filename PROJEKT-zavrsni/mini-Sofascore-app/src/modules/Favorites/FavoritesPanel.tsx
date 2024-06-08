import { useThemeContext } from '@/context/ThemeContext'
import { Flex, VStack, Text, Box } from '@kuma-ui/core'
import Image from 'next/image'
import left from '../../../public/images/ic_left.png'
import leftLight from '../../../public/images/ic_leftLight.png'
import right from '../../../public/images/IconBlueRight@2x.png'
import rightLight from '../../../public/images/IconBlueRightLight@2x.png'
import bellNoclick from '../../../public/images/bellNotClicked.png'
import bellClicked from '../../../public/images/belClicked.png'
import { useEffect, useState } from 'react'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { EventCell } from './EventCell'
import { FavouriteEvent } from '@/model/favorites'
import { fullDaysInWeek } from '@/model/daysInWeek'
import { settingFavourites } from '@/utils/settingFavourites'

// eslint-disable-next-line no-unused-vars
export function FavouritesPanel(props: { id: (id: number) => void }) {
  const { isDark } = useThemeContext()
  const { mobileWindowSize } = useWindowSizeContext()

  const [span, setSpan] = useState('next')
  const [page, setPage] = useState(0)
  const [prevSpan, setPrevSpan] = useState('next')
  const [prevPage, setPrevPage] = useState(0)
  const [prevDate, setPrevDate] = useState<Date | undefined>()
  //const [clickedCell, setClickedCell] = useState<number | undefined>(undefined)
  //const [current, setCurrent] = useState<FavouriteEvent[]>([])
  const { openedWidget, setOpenedWidget } = useWidgetContext()
  const [selectedCell, setSelectedCell] = useState<number>(0)

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
    localStorage.setItem('currentFavouritesMiniSofa', JSON.stringify(newFavourites))
  }, [newFavourites])

  const favouritesHandle = (favourites: FavouriteEvent[], eventId: number, date: Date) => {
    console.log(favourites)
    setNewFavourites(settingFavourites(favourites, eventId, date))
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
          onClick={() => nextMatchesPage('last')}
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
          onClick={() => nextMatchesPage('next')}
        >
          <Text>Next</Text>
          <Image src={isDark ? rightLight : right} alt="iconRight" width={14} height={14} priority></Image>
        </Flex>
      </Flex>

      {newFavourites.length === 0 ? (
        <Text>No favourites</Text>
      ) : (
        newFavourites.map(({ id, date }) => (
          <Box key={id}>
            {diffDateDay(date) ? (
              new Date(date).getDate() === new Date().getDate() &&
              new Date(date).getMonth() === new Date().getMonth() ? (
                <Flex p="20px 16px" fontSize="14px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
                  <Text>
                    Today -{' '}
                    {new Date(date).getDate() +
                      '. ' +
                      new Date(date).getMonth() +
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
                      new Date(date).getMonth() +
                      '. ' +
                      new Date(date).getFullYear() +
                      '.'}
                  </Text>
                </Flex>
              )
            ) : null}

            <Flex width="100%" position="relative" alignItems="center">
              <EventCell
                key={id}
                eventId={id}
                openWidget={(data: boolean) => setOpenedWidget(data)}
                openId={props.id}
                selectedId={(id: number) => setSelectedCell(id)}
                clickedCell={selectedCell}
              />
              <Flex>
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
                  onClick={() => favouritesHandle(newFavourites, id, new Date(date))}
                  alignItems="center"
                  justify="center"
                  w="10%"
                  gap="5px"
                >
                  <Image
                    src={newFavourites.find(({ id }) => id === id) !== undefined ? bellClicked : bellNoclick}
                    alt="bell icon"
                    width={20}
                    height={20}
                  ></Image>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        ))
      )}
    </VStack>
  )
}
