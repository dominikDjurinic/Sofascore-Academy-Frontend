import { useDateFormatContext } from '@/context/DateFormatContext'
import { SportDateEvent } from '@/model/events'
import { Box, Flex, Text, VStack } from '@kuma-ui/core'
import Image from 'next/image'

export function EventCell(props: { event: SportDateEvent; matchCell: boolean }) {
  const setEventStatus = (eventStatus: string) => {
    if (eventStatus === 'inprogress') {
      return 'Live'
    } else if (eventStatus === 'finished') {
      return 'FT'
    } else {
      return '-'
    }
  }

  const { engDate } = useDateFormatContext()

  return (
    <Flex alignItems="center" gap="3px" h="fit-content" fontSize="14px" w="100%">
      <VStack
        justify="center"
        alignItems="center"
        w="80px"
        padding="10px 10px"
        color="var(--on-surface-on-surface-lv-2)"
      >
        <Text textAlign="center">
          {props.matchCell === true
            ? engDate
              ? new Date(props.event?.startDate).toLocaleDateString('en-UK', { month: '2-digit' }) +
                '/' +
                new Date(props.event?.startDate).toLocaleDateString('en-UK', { day: '2-digit' }) +
                '/' +
                new Date(props.event?.startDate).toLocaleDateString('en-UK', { year: 'numeric' })
              : new Date(props.event.startDate).getDate() +
                '. ' +
                (new Date(props.event.startDate).getMonth() + 1) +
                '. ' +
                new Date(props.event.startDate).getFullYear() +
                '.'
            : new Date(props.event.startDate).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Text color={`${props.event.status === 'inprogress' ? 'var(--specific-live)' : null}`}>
          {setEventStatus(props.event.status)}
        </Text>
      </VStack>
      <Box minWidth="1px" h="40px" backgroundColor="var(--on-surface-on-surface-lv-4)" borderRadius="2px"></Box>
      <Flex width="100%" justify="space-between" padding="10px">
        <VStack justify="center">
          <Flex gap="8px" alignItems="center" p="5px 0px">
            <Image
              src={`https://academy-backend.sofascore.dev/team/${props.event.homeTeam.id}/image`}
              alt="league logo"
              width={16}
              height={16}
              priority
            ></Image>
            <Text
              color={`${
                props.event.winnerCode === 'away' || props.event.winnerCode === 'draw'
                  ? 'var(--on-surface-on-surface-lv-2)'
                  : 'var(--on-surface-on-surface-lv-1)'
              }`}
            >
              {props.event.homeTeam.name}
            </Text>
          </Flex>
          <Flex gap="8px" alignItems="center" p="5px 0px">
            <Image
              src={`https://academy-backend.sofascore.dev/team/${props.event.awayTeam.id}/image`}
              alt="league logo"
              width={16}
              height={16}
              priority
            ></Image>
            <Text
              color={`${
                props.event.winnerCode === 'home' || props.event.winnerCode === 'draw'
                  ? 'var(--on-surface-on-surface-lv-2)'
                  : 'var(--on-surface-on-surface-lv-1)'
              }`}
            >
              {props.event.awayTeam.name}
            </Text>
          </Flex>
        </VStack>
        <VStack justify="center" w="20px" alignItems="center">
          <Text
            color={`${
              props.event.winnerCode === 'away' || props.event.winnerCode === 'draw'
                ? 'var(--on-surface-on-surface-lv-2)'
                : props.event.status === 'inprogress'
                ? 'var(--specific-live)'
                : 'var(--on-surface-on-surface-lv-1)'
            }`}
            p="5px 0px"
          >
            {props.event.homeScore.total}
          </Text>
          <Text
            color={`${
              props.event.winnerCode === 'home' || props.event.winnerCode === 'draw'
                ? 'var(--on-surface-on-surface-lv-2)'
                : props.event.status === 'inprogress'
                ? 'var(--specific-live)'
                : 'var(--on-surface-on-surface-lv-1)'
            }`}
            p="5px 0px"
          >
            {props.event.awayScore.total}
          </Text>
        </VStack>
      </Flex>
    </Flex>
  )
}
