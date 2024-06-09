import { Panel } from '@/components/Panel'
import { Leagues } from '@/model/sports'
import { useEffect, useState } from 'react'
import { SportDateEvent } from '@/model/events'
import { Text, Box, Flex, VStack, Link } from '@kuma-ui/core'
import { EventCell } from './EventCell'
import { fullDaysInWeek } from '@/model/daysInWeek'
import Image from 'next/image'
import right from '../../../public/images/ic_pointer_right@2x.png'
import rightLight from '../../../public/images/ic_pointer_rightLight@2x.png'
import bellNoclick from '../../../public/images/bellNotClicked.png'
import bellClicked from '../../../public/images/belClicked.png'
import bellClickedLight from '../../../public/images/belClickedLight.png'
import { DateNavigation } from '@/components/DateNavigation'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { formatName } from '@/utils/formatPathName'
import { useThemeContext } from '@/context/ThemeContext'
import { useDateFormatContext } from '@/context/DateFormatContext'
import { LinkingDetails } from '@/model/linking'
import { FavouriteEvent } from '@/model/favorites'
import { settingFavourites } from '@/utils/settingFavourites'
import { TournamentDetails } from '@/model/tournaments'
import { favouritesDate } from '@/utils/favouritesDate'

export function EventList(props: {
  leagues: Leagues[]
  selSlug: string
  date: string
  data: SportDateEvent[]
  // eslint-disable-next-line no-unused-vars
  id: (id: number) => void
  // eslint-disable-next-line no-unused-vars
  setLinkData: (data: LinkingDetails[]) => void
}) {
  const formattingDate = () => {
    const format = new Date(props.date)
    return format
  }

  const { mobileWindowSize } = useWindowSizeContext()
  const { isDark } = useThemeContext()
  const [currentDate, setCurrentDate] = useState<Date>(formattingDate)
  const [clickedCell, setClickedCell] = useState<number | undefined>(undefined)
  const { openedWidget, setOpenedWidget } = useWidgetContext()
  const { engDate } = useDateFormatContext()

  useEffect(() => {
    setCurrentDate(formattingDate)
  }, [props.date])

  const [newFavourites, setNewFavourites] = useState<FavouriteEvent[]>([])

  useEffect(() => {
    const favourites = localStorage.getItem(favouritesDate(props.date)) //dohvat favorita iz localStorage
    if (favourites !== null) {
      setNewFavourites(JSON.parse(favourites))
    } else {
      setNewFavourites([])
    }
  }, [props.date])

  useEffect(() => {
    if (newFavourites.length) localStorage.setItem(favouritesDate(props.date), JSON.stringify(newFavourites)) //spremanje favorita u localStorage
  }, [newFavourites])

  const favouritesHandle = (
    favourites: FavouriteEvent[],
    eventId: number,
    date: Date,
    tournament: TournamentDetails
  ) => {
    console.log(favourites)
    setNewFavourites(settingFavourites(favourites, eventId, date, tournament)) //poziv funkcije za obradu zahtjeva za favoritom te vraca novo polje s objektima
  }

  const checkTournamentId = (dataId: number, tournamentId: number) => {
    //provjera poklapanja trenutnog eventa s tournamentom
    if (dataId === tournamentId) {
      return true
    } else {
      return false
    }
  }

  const formatTodayDate = () => {
    const formatToday = new Date()
    formatToday.setHours(formatToday.getHours() + 2) //prilagodba datuma nasoj vremenskoj zoni
    return formatToday
  }

  return (
    <Panel>
      <DateNavigation key={props.date} date={props.date} />
      <Flex
        p="20px 16px"
        fontSize="14px"
        fontWeight="bold"
        color="var(--on-surface-on-surface-lv-1)"
        alignItems="center"
        justify="space-between"
        gap="5px"
        backgroundColor={`${mobileWindowSize ? 'var(--surface-surface-0)' : 'initial'} `}
      >
        <Text>
          {currentDate.getDate() === formatTodayDate().getDate() &&
          currentDate.getMonth() === formatTodayDate().getMonth()
            ? 'Today'
            : `${
                engDate
                  ? fullDaysInWeek[currentDate.getDay()] +
                    ' - ' +
                    currentDate.toLocaleDateString('en-UK', { month: '2-digit' }) +
                    '/' +
                    currentDate.toLocaleDateString('en-UK', { day: '2-digit' }) +
                    '/' +
                    currentDate.toLocaleDateString('en-UK', { year: 'numeric' })
                  : fullDaysInWeek[currentDate.getDay()] +
                    ' - ' +
                    currentDate.getDate() +
                    '. ' +
                    (currentDate.getMonth() + 1) +
                    '. ' +
                    currentDate.getFullYear() +
                    '.'
              }`}
        </Text>
        <Text color="var(--on-surface-on-surface-lv-2)">
          {props.data?.length !== undefined ? `${props.data?.length + ' Events'}` : '0 Events'}
        </Text>
      </Flex>
      {mobileWindowSize ? (
        <Flex p="1px 0px" w="100%" justify="center" backgroundColor="var(--surface-surface-0)">
          <Box
            w="95%"
            backgroundColor="var(--surface-surface-1)"
            borderRadius="16px"
            boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
            paddingBottom="16px"
          >
            {props.leagues.map(({ id, name, country }, index) => (
              <VStack key={id} width="100%">
                <Flex
                  p="20px 16px"
                  fontSize="14px"
                  fontWeight="bold"
                  color="var(--on-surface-on-surface-lv-1)"
                  alignItems="center"
                  gap="10px"
                >
                  <Image src={`/api/tournament/${id}/image`} alt="league logo" width={32} height={32}></Image>
                  <Text>{country.name}</Text>
                  <Image src={isDark ? rightLight : right} alt="icon right" width={15} height={15}></Image>
                  <Text color="var(--on-surface-on-surface-lv-2)">{name}</Text>
                </Flex>
                {props.data !== undefined && props.data?.length > 0 ? null : (
                  <Text fontSize="14px" fontWeight="bold" color="var(--on-surface-on-surface-lv-2)" p="20px 16px">
                    No match
                  </Text>
                )}
                {props.data?.map(event => (
                  <Flex
                    key={event.id}
                    width="100%"
                    position="relative"
                    alignItems="center"
                    _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
                    backgroundColor={`${
                      clickedCell === event.id && openedWidget
                        ? 'var(--color-primary-highlight)'
                        : 'var(--surface-surface-1)'
                    }`}
                  >
                    <Link
                      w="90%"
                      key={event.id}
                      href={`${`/tournament/${event.tournament.sport.slug}/${event.tournament.name}/${formatName(
                        event.homeTeam.name,
                        event.awayTeam.name
                      )}/${event.id}`}`}
                      onClick={(e: { preventDefault: () => void }) => {
                        if (!mobileWindowSize) {
                          e.preventDefault()
                        }
                      }}
                    >
                      <Box
                        width="100%"
                        cursor="pointer"
                        fontSize="14px"
                        onClick={() => {
                          props.id(event.id)
                          setClickedCell(event.id)
                          if (!mobileWindowSize) {
                            setOpenedWidget(true)
                          }
                        }}
                      >
                        {checkTournamentId(event.tournament.id, id) === true ? (
                          <EventCell event={event} matchCell={false} />
                        ) : null}
                      </Box>
                    </Link>
                    {checkTournamentId(event.tournament.id, id) === true ? (
                      <Box
                        minWidth="1px"
                        h="40px"
                        backgroundColor="var(--on-surface-on-surface-lv-4)"
                        borderRadius="2px"
                      ></Box>
                    ) : null}
                    {checkTournamentId(event.tournament.id, id) === true ? (
                      <Flex
                        position="absolute"
                        right="0px"
                        cursor="pointer"
                        onClick={() =>
                          favouritesHandle(newFavourites, event.id, new Date(event.startDate), event.tournament)
                        }
                        alignItems="center"
                        justify="center"
                        w="10%"
                        gap="5px"
                      >
                        <Image
                          src={
                            newFavourites.find(({ id }) => id === event.id) !== undefined
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
                    ) : null}
                  </Flex>
                ))}
                {index === props.leagues.length - 1 ? null : (
                  <Box
                    minWidth="100%"
                    h="1px"
                    backgroundColor="var(--on-surface-on-surface-lv-4)"
                    borderRadius="2px"
                  ></Box>
                )}
              </VStack>
            ))}
          </Box>
        </Flex>
      ) : (
        <Box>
          {props.leagues.map(({ id, name, country }, index) => (
            <VStack key={id} width="100%">
              <Flex
                p="20px 16px"
                fontSize="14px"
                fontWeight="bold"
                color="var(--on-surface-on-surface-lv-1)"
                alignItems="center"
                gap="10px"
              >
                <Image src={`/api/tournament/${id}/image`} alt="league logo" width={32} height={32}></Image>
                <Text>{country.name}</Text>
                <Image src={isDark ? rightLight : right} alt="icon right" width={15} height={15}></Image>
                <Text color="var(--on-surface-on-surface-lv-2)">{name}</Text>
              </Flex>
              {props.data !== undefined && props.data?.length > 0 ? null : (
                <Text fontSize="14px" fontWeight="bold" color="var(--on-surface-on-surface-lv-2)" p="20px 16px">
                  No match
                </Text>
              )}
              {props.data?.map(event => (
                <Flex
                  key={event.id}
                  width="100%"
                  position="relative"
                  alignItems="center"
                  _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
                  backgroundColor={`${
                    clickedCell === event.id && openedWidget
                      ? 'var(--color-primary-highlight)'
                      : 'var(--surface-surface-1)'
                  }`}
                >
                  <Link
                    width="90%"
                    key={event.id}
                    href={`${`/tournament/${event.tournament.sport.slug}/${event.tournament.name}/${formatName(
                      event.homeTeam.name,
                      event.awayTeam.name
                    )}/${event.id}`}`}
                    onClick={(e: { preventDefault: () => void }) => {
                      if (!mobileWindowSize) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <Box
                      width="100%"
                      cursor="pointer"
                      fontSize="14px"
                      onClick={() => {
                        props.id(event.id)
                        setClickedCell(event.id)
                        if (!mobileWindowSize) {
                          setOpenedWidget(true)
                        }
                        props.setLinkData([
                          {
                            name: `${event.tournament.name}`,
                            urlLink: `/tournament/${props.selSlug}/${event.tournament.name}`,
                          },
                          {
                            name: `${event.homeTeam.name} vs ${event.awayTeam.name}`,
                            urlLink: `/tournament/${props.selSlug}/${event.tournament.name}/${formatName(
                              event.homeTeam.name,
                              event.awayTeam.name
                            )}/${event.id}`,
                          },
                        ])
                      }}
                    >
                      {checkTournamentId(event.tournament.id, id) === true ? (
                        <EventCell event={event} matchCell={false} />
                      ) : null}
                    </Box>
                  </Link>
                  {checkTournamentId(event.tournament.id, id) === true ? (
                    <Box
                      minWidth="1px"
                      h="40px"
                      backgroundColor="var(--on-surface-on-surface-lv-4)"
                      borderRadius="2px"
                    ></Box>
                  ) : null}
                  {checkTournamentId(event.tournament.id, id) === true ? (
                    <Flex
                      position="absolute"
                      right="0px"
                      cursor="pointer"
                      onClick={() =>
                        favouritesHandle(newFavourites, event.id, new Date(event.startDate), event.tournament)
                      }
                      alignItems="center"
                      justify="center"
                      w="10%"
                      gap="5px"
                    >
                      <Image
                        src={
                          newFavourites.find(({ id }) => id === event.id) !== undefined
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
                  ) : null}
                </Flex>
              ))}
              {index === props.leagues.length - 1 ? null : (
                <Box
                  minWidth="100%"
                  h="1px"
                  backgroundColor="var(--on-surface-on-surface-lv-4)"
                  borderRadius="2px"
                ></Box>
              )}
            </VStack>
          ))}
        </Box>
      )}
    </Panel>
  )
}
