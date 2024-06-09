import { Card, Goal, Period } from '@/model/incidents'
import useSWR from 'swr'
import { CardCell } from './Incidents/CardCell'
import { GoalCell } from './Incidents/GoalCell'
import { PeriodCell } from './Incidents/PeriodCell'
import { Flex, Text, VStack } from '@kuma-ui/core'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import Link from 'next/link'
import { SportDateEvent } from '@/model/events'

export function EventIncidents(props: { eventId: number | undefined; selSlug: string }) {
  const { data } = useSWR<(Card & Goal & Period)[]>(`/api/event/${props.eventId}/incidents`)
  const { data: event } = useSWR<SportDateEvent>(`/api/event/${props.eventId}`)

  const { mobileWindowSize } = useWindowSizeContext()

  return (
    <VStack
      w={`${mobileWindowSize ? '95%' : '100%'}`}
      borderRadius={`${mobileWindowSize ? '16px' : '0px'}`}
      backgroundColor={`${mobileWindowSize ? 'var(--surface-surface-1)' : 'initial'}`}
    >
      {data?.length === 0 ? (
        <VStack alignItems="center" paddingBottom="16px">
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
          <Link href={`/tournament/${event?.tournament.sport.slug}/${event?.tournament.name}`}>
            <Flex
              w="fit-content"
              m="8px"
              cursor="pointer"
              p="10px 16px"
              bgColor="var(--surface-surface-1)"
              justifyContent="center"
              alignItems="center"
              border="solid 2px var(--color-primary-default)"
              borderRadius="2px"
              color="var(--color-primary-default)"
              fontWeight="bold"
              fontSize="16px"
            >
              <Text>View Tournament Details</Text>
            </Flex>
          </Link>
        </VStack>
      ) : (
        data
          ?.slice(0)
          .reverse()
          .map(incident => {
            if (incident.type === 'card') {
              return props.selSlug === 'basketball' ? (
                <CardCell key={incident.id} data={incident} />
              ) : (
                <Link key={incident.id} href={`/player/${props.selSlug}/${incident.player.slug}/${incident.player.id}`}>
                  <CardCell key={incident.id} data={incident} />
                </Link>
              )
            } else if (incident.type === 'goal') {
              return props.selSlug === 'basketball' ? (
                <GoalCell key={incident.id} data={incident} />
              ) : (
                <Link key={incident.id} href={`/player/${props.selSlug}/${incident.player.slug}/${incident.player.id}`}>
                  <GoalCell key={incident.id} data={incident} />
                </Link>
              )
            } else {
              return <PeriodCell key={incident.id} data={incident} />
            }
          })
      )}
    </VStack>
  )
}
