import { Text, Flex, VStack } from '@kuma-ui/core'
import Image from 'next/image'
import { useState } from 'react'
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
    props.currentDate(new Date())
    return dates
  }

  const [newDates, setNewDates] = useState<Date[]>(() => initialDates())
  const [centralDate, setCentralDate] = useState<Date>(new Date())

  const newDatesFunc = (next: number) => {
    let dates: Date[] = []

    console.log(centralDate)
    let centralDateNew: Date = new Date(centralDate)

    centralDateNew.setDate(centralDateNew.getDate() + next) //novi central date +1 ili -1 ili 0 inicijalno

    setCentralDate(new Date(centralDateNew))
    props.currentDate(centralDateNew)

    let prevDate: Date = new Date(centralDateNew) //uzima novi central date
    prevDate.setDate(prevDate.getDate() - 3)

    for (let i = 0; i < 7; ++i) {
      let nextDate: Date = new Date(prevDate)
      nextDate.setDate(nextDate.getDate() + i)
      dates.push(new Date(nextDate))
    }

    setNewDates(dates)
    console.log('New dates:' + newDates)
  }

  return (
    <Flex position="relative" bgColor="var(--color-primary-variant)" height="48px" justify="space-between" p="0px 10px">
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
        <VStack
          w="48px"
          key={date.toUTCString()}
          p="10px 5px"
          justify="center"
          alignItems="center"
          color="var(--surface-surface-1)"
          fontSize="12px"
          borderBottom={`${
            date.getDate() === centralDate.getDate() && date.getMonth() === centralDate.getMonth()
              ? '4px solid var(--surface-surface-1)'
              : '4px solid var(--color-primary-variant)'
          }`}
        >
          <Text
            fontWeight={`${
              date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() ? 'bold' : 'normal'
            }`}
          >
            {date.getDate() === new Date().getDate() && new Date().getMonth() === today.getMonth()
              ? 'TODAY'
              : days[date.getDay()]}
          </Text>
          <Text>{new Date(date).toLocaleDateString('hr-HR', { day: '2-digit', month: 'numeric' })}</Text>
        </VStack>
      ))}
    </Flex>
  )
}
