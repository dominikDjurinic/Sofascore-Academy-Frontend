import { SportDateEvent } from '@/model/events'
import { Flex, Text, VStack } from '@kuma-ui/core'

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

  return (
    <Flex width="100%" justify="space-between" padding="10px">
      <VStack justify="center" alignItems="center">
        <Text>
          {new Date(props.event.startDate).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Text>{setEventStatus(props.event.status)}</Text>
      </VStack>

      <VStack justify="center" alignItems="center">
        <Text>{props.event.homeTeam.name}</Text>
        <Text>{props.event.awayTeam.name}</Text>
      </VStack>
      <VStack justify="center" alignItems="center">
        <Text>{props.event.homeScore.total}</Text>
        <Text>{props.event.awayScore.total}</Text>
      </VStack>
    </Flex>
  )
}
