import { Text, Flex, VStack, Box } from '@kuma-ui/core'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import left from '../../public/images/ic_left.png'
import right from '../../public/images/ic_right.png'
import { daysInWeek } from '@/model/daysInWeek'

// eslint-disable-next-line no-unused-vars
export function DateNavigation(props: { currentDate: (currDate: Date) => void }) {
  const today = new Date()
  const days = daysInWeek

  const initialDates = () => {
    let dates: Date[] = []

    let prevDate: Date = today //uzima novi central date
    prevDate.setDate(prevDate.getDate() - 3)

    for (let i = 0; i < 7; ++i) {
      let nextDate: Date = new Date()
      nextDate.setDate(prevDate.getDate() + i)
      dates.push(nextDate)
    }
    return dates
  }

  const [newDates, setNewDates] = useState<Date[]>(() => initialDates())
  const [centralDate, setCentralDate] = useState<Date>(new Date())

  const newDatesFunc = (next: number) => {
    let dates: Date[] = []

    let centralDateNew: Date = new Date(centralDate)

    centralDateNew.setDate(centralDateNew.getDate() + next) //novi central date +1 ili -1 ili 0 inicijalno

    setCentralDate(new Date(centralDateNew))

    let prevDate: Date = new Date(centralDateNew) //uzima novi central date
    prevDate.setDate(prevDate.getDate() - 3)

    for (let i = 0; i < 7; ++i) {
      let nextDate: Date = new Date(prevDate)
      nextDate.setDate(nextDate.getDate() + i)
      dates.push(new Date(nextDate))
    }

    setNewDates(dates)
  }

  useEffect(() => {
    props.currentDate(new Date(centralDate))
  }, [centralDate])

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
        onClick={() => newDatesFunc(-1)}
        p="4px"
        bgColor="var(--surface-surface-1)"
        justifyContent="center"
        alignItems="center"
        borderRadius="2px"
      >
        <Image src={left} alt="iconLeft" width={24} height={24}></Image>
      </Flex>
      <Flex
        m="8px"
        position="absolute"
        right="0px"
        cursor="pointer"
        onClick={() => newDatesFunc(1)}
        p="4px"
        bgColor="var(--surface-surface-1)"
        justifyContent="center"
        alignItems="center"
        borderRadius="2px"
      >
        <Image src={right} alt="iconRight" width={24} height={24}></Image>
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
                date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() ? 'bold' : 'normal'
              }`}
            >
              {date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth()
                ? 'TODAY'
                : days[date.getDay()]}
            </Text>
            <Text>{new Date(date).getDate() + '. ' + (new Date(date).getMonth() + 1) + '.'}</Text>
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
