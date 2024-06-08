import { Text, Flex, VStack, Box } from '@kuma-ui/core'
import Image from 'next/image'
import { useState } from 'react'
import left from '../../public/images/ic_left.png'
import leftLight from '../../public/images/ic_leftLight.png'
import right from '../../public/images/IconBlueRight@2x.png'
import rightLight from '../../public/images/IconBlueRightLight@2x.png'
import { daysInWeek } from '@/model/daysInWeek'
import { useRouter } from 'next/router'
import { useSlugContext } from '@/context/SlugContext'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { useThemeContext } from '@/context/ThemeContext'
import { useDateFormatContext } from '@/context/DateFormatContext'

// eslint-disable-next-line no-unused-vars
export function DateNavigation(props: { date: string }) {
  const router = useRouter()
  const days = daysInWeek

  const [centralDate, setCentralDate] = useState<Date>(new Date(props.date))

  const { slug } = useSlugContext()
  const { setOpenedWidget } = useWidgetContext()
  const { isDark } = useThemeContext()
  const { engDate } = useDateFormatContext()

  const formattingDate = (date: Date) => {
    const format = date.toISOString().split('T')[0]
    return format
  }

  const initialDates = () => {
    let dates: Date[] = []

    let prevDate: Date = new Date(props.date) //uzima novi central date
    prevDate.setDate(new Date(props.date).getDate() - 3)

    setCentralDate(new Date(props.date))

    for (let i = 0; i < 7; ++i) {
      let nextDate: Date = new Date(prevDate)
      nextDate.setDate(new Date(nextDate).getDate() + i)
      dates.push(new Date(nextDate))
    }
    return dates
  }

  const [newDates] = useState<Date[]>(() => initialDates())

  const formatTodayDate = () => {
    const formatToday = new Date()
    return formatToday
  }

  const newDatesFunc = (next: number) => {
    let nextDate: Date = new Date(props.date)
    nextDate.setDate(new Date(props.date).getDate() + next)

    if (nextDate.getDate() === formatTodayDate().getDate() && nextDate.getMonth() === formatTodayDate().getMonth()) {
      if (slug === 'football') {
        router.push(`/`)
      } else {
        router.push(`/${slug}`)
      }
    } else {
      router.push(`/${slug}/${formattingDate(nextDate)}`)
    }
  }

  return (
    <Flex
      position="relative"
      bgColor="var(--color-primary-variant)"
      height="fit-content"
      justify="space-between"
      p="0px 10px"
    >
      <Flex
        m="8px"
        position="absolute"
        left="0px"
        cursor="pointer"
        onClick={() => {
          newDatesFunc(-1)
          setOpenedWidget(false)
        }}
        p="10px"
        bgColor="var(--surface-surface-1)"
        justifyContent="center"
        alignItems="center"
        borderRadius="2px"
        _hover={{ backgroundColor: 'var(--on-color-on-color-secondary)' }}
      >
        <Image src={isDark ? leftLight : left} alt="iconLeft" width={14} height={14}></Image>
      </Flex>
      <Flex
        m="8px"
        position="absolute"
        right="0px"
        cursor="pointer"
        onClick={() => {
          newDatesFunc(1)
          setOpenedWidget(false)
        }}
        p="10px"
        bgColor="var(--surface-surface-1)"
        justifyContent="center"
        alignItems="center"
        borderRadius="2px"
        _hover={{ backgroundColor: 'var(--on-color-on-color-secondary)' }}
      >
        <Image src={isDark ? rightLight : right} alt="iconRight" width={14} height={14}></Image>
      </Flex>
      {newDates?.map(date => (
        <VStack key={date.toUTCString()}>
          <VStack
            w="48px"
            p="10px 5px"
            justify="center"
            alignItems="center"
            color="var(--surface-surface-1)"
            fontSize="12px"
          >
            <Text
              fontWeight={`${
                date.getDate() === formatTodayDate().getDate() && date.getMonth() === formatTodayDate().getMonth()
                  ? 'bold'
                  : 'normal'
              }`}
            >
              {date.getDate() === formatTodayDate().getDate() && date.getMonth() === formatTodayDate().getMonth()
                ? 'TODAY'
                : days[date.getDay()]}
            </Text>
            <Text>
              {engDate
                ? new Date(date).toLocaleDateString('en-UK', { month: '2-digit' }) +
                  '/' +
                  new Date(date).toLocaleDateString('en-UK', { day: '2-digit' }) +
                  '/'
                : new Date(date).getDate() + '. ' + (new Date(date).getMonth() + 1) + '.'}
            </Text>
          </VStack>
          {date.getDate() === centralDate.getDate() && date.getMonth() === centralDate.getMonth() ? (
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
      ))}
    </Flex>
  )
}
