import { SportDateEvent } from '@/model/events'
import { Box, Flex, Text, VStack } from '@kuma-ui/core'
import Image from 'next/image'

export function EventCell(props: { event: SportDateEvent }) {
  const setEventStatus = (eventStatus: string) => {
    if (eventStatus === 'inprogress') {
      return 'IP'
    } else if (eventStatus === 'finished') {
      return 'FT'
    } else {
      return '-'
    }
  }

  const whoWon = () => {
    if (props.event.homeScore.total > props.event.awayScore.total) {
      return 2
    } else if (props.event.homeScore.total < props.event.awayScore.total) {
      return 1
    } else if (
      props.event.homeScore.total === props.event.awayScore.total &&
      props.event.homeScore.total !== undefined
    ) {
      return 3
    }
  }

  return (
    <Flex alignItems="center" gap="3px" h="fit-content">
      <VStack justify="center" alignItems="center" padding="10px 10px" color="var(--on-surface-on-surface-lv-2)">
        <Text>
          {new Date(props.event.startDate).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Text>{setEventStatus(props.event.status)}</Text>
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
              color={`${whoWon() === 1 || whoWon() === 3 ? 'var(--on-surface-on-surface-lv-2)' : 'var(--on-surface-on-surface-lv-1)'}`}
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
              color={`${whoWon() === 2 || whoWon() === 3 ? 'var(--on-surface-on-surface-lv-2)' : 'var(--on-surface-on-surface-lv-1)'}`}
            >
              {props.event.awayTeam.name}
            </Text>
          </Flex>
        </VStack>
        <VStack justify="center" padding="0px 10px">
          <Text
            color={`${whoWon() === 1 || whoWon() === 3 ? 'var(--on-surface-on-surface-lv-2)' : 'var(--on-surface-on-surface-lv-1)'}`}
            p="5px 0px"
          >
            {props.event.homeScore.total}
          </Text>
          <Text
            color={`${whoWon() === 2 || whoWon() === 3 ? 'var(--on-surface-on-surface-lv-2)' : 'var(--on-surface-on-surface-lv-1)'}`}
            p="5px 0px"
          >
            {props.event.awayScore.total}
          </Text>
        </VStack>
      </Flex>
    </Flex>
  )
}
