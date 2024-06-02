import { Card, Goal, Period } from '@/model/incidents'
import useSWR from 'swr'
import { CardCell } from './Incidents/CardCell'
import { GoalCell } from './Incidents/GoalCell'
import { PeriodCell } from './Incidents/PeriodCell'
import { Flex, Text } from '@kuma-ui/core'

export function EventIncidents(props: { eventId: number | undefined }) {
  const { data, error } = useSWR<(Card & Goal & Period)[], Error>(`/api/event/${props.eventId}/incidents`)

  console.log(error)

  return (
    <>
      {data?.length === 0 ? (
        <Flex w="100%" justify="center">
          <Flex
            w="98%"
            borderRadius="8px"
            backgroundColor="var(--surface-surface-2)"
            m="20px 0px"
            justify="center"
            alignItems="center"
            p="16px 0px"
          >
            <Text fontSize="14px" color="var(--on-surface-on-surface-lv-2)">
              No results yet.
            </Text>
          </Flex>
        </Flex>
      ) : (
        data
          ?.slice(0)
          .reverse()
          .map(incident => {
            if (incident.type === 'card') {
              return <CardCell key={incident.id} data={incident} />
            } else if (incident.type === 'goal') {
              return <GoalCell key={incident.id} data={incident} />
            } else {
              return <PeriodCell key={incident.id} data={incident} />
            }
          })
      )}
    </>
  )
}
