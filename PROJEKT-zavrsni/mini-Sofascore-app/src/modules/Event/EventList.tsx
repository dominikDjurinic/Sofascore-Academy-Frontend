import { Panel } from '@/components/Panel'
import { Leagues } from '@/model/sports'
import { useEffect, useState } from 'react'
import { SportDateEvent } from '@/model/events'
import { Text, Box, Flex, VStack } from '@kuma-ui/core'
import { EventCell } from './EventCell'
import { fullDaysInWeek } from '@/model/daysInWeek'
import Image from 'next/image'
import right from '../../../public/images/ic_pointer_right@2x.png'
import rightLight from '../../../public/images/ic_pointer_rightLight@2x.png'
import { DateNavigation } from '@/components/DateNavigation'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { useRouter } from 'next/router'
import { formatName } from '@/utils/formatPathName'
import { useThemeContext } from '@/context/ThemeContext'

//import useSWR from 'swr'
//import { useSlugContext } from '@/context/SlugContext'

export function EventList(props: {
  leagues: Leagues[]
  selSlug: string
  date: string
  data: SportDateEvent[]
  // eslint-disable-next-line no-unused-vars
  id: (id: number) => void
}) {
  /*const formattingDate = () => {
    const format = currentDate.toISOString().split('T')[0]
    return format
  }*/

  const formattingDate = () => {
    const format = new Date(props.date)
    return format
  }

  const router = useRouter()
  const { mobileWindowSize } = useWindowSizeContext()
  const { isDark } = useThemeContext()
  const [currentDate, setCurrentDate] = useState<Date>(formattingDate)
  const [clickedCell, setClickedCell] = useState<number | undefined>(undefined)
  const { openedWidget, setOpenedWidget } = useWidgetContext()

  /*
  const settingDate = (currDate: Date) => {
    setCurrentDate(new Date(currDate))
  }
  */
  //const [formattedDate, setFormattedDate] = useState(formattingDate)

  //const { data, error, isLoading } = useSWR<SportDateEvent[], Error>(`/api/sport/${slug}/events/${props.date}`)

  //console.log(error)

  useEffect(() => {
    console.log(props.date)
    setCurrentDate(formattingDate)
  }, [props.date])

  const checkTournamentId = (dataId: number, tournamentId: number) => {
    if (dataId === tournamentId) {
      return true
    } else {
      return false
    }
  }

  const formatTodayDate = () => {
    const formatToday = new Date()
    formatToday.setHours(formatToday.getHours() + 2) //prilagodba datuma našoj vremenskoj zoni
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
      >
        <Text>
          {currentDate.getDate() === formatTodayDate().getDate() &&
          currentDate.getMonth() === formatTodayDate().getMonth()
            ? 'Today'
            : `${
                fullDaysInWeek[currentDate.getDay()] +
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
            <Box
              key={event.id}
              width="100%"
              _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
              cursor="pointer"
              fontSize="14px"
              onClick={() => {
                props.id(event.id)
                setClickedCell(event.id)
                if (mobileWindowSize) {
                  router.push(
                    `/tournament/${event.tournament.sport.slug}/${event.tournament.name}/${formatName(event.homeTeam.name, event.awayTeam.name)}/${event.id}`
                  )
                } else {
                  setOpenedWidget(true)
                }
              }}
              backgroundColor={`${clickedCell === event.id && openedWidget ? 'var(--color-primary-highlight)' : 'var(--surface-surface-1)'}`}
            >
              {checkTournamentId(event.tournament.id, id) === true ? <EventCell event={event} /> : null}
            </Box>
          ))}
          {index === props.leagues.length - 1 ? null : (
            <Box minWidth="100%" h="1px" backgroundColor="var(--on-surface-on-surface-lv-4)" borderRadius="2px"></Box>
          )}
        </VStack>
      ))}
    </Panel>
  )
}
