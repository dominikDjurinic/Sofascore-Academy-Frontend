import { SportDateEvent } from '@/model/events'
import { Box, Flex, Link, Text, VStack } from '@kuma-ui/core'
import Image from 'next/image'

export function EventCell(props: { event?: SportDateEvent | undefined }) {
  const setEventStatus = (eventStatus: string | undefined) => {
    if (eventStatus === 'inprogress') {
      return 'Live'
    } else if (eventStatus === 'finished') {
      return 'Full Time'
    } else {
      return '-'
    }
  }

  return (
    <>
      <Flex w="100%" justify="space-between" alignItems="center" p="16px 16px">
        <Link
          href={`/team/${props.event?.tournament.sport.slug}/${props.event?.homeTeam.name}/${props.event?.homeTeam.id}`}
        >
          <VStack gap="8px" alignItems="center" justify="center" w="96px" h="auto">
            {props.event !== undefined ? (
              <Image
                src={`https://academy-backend.sofascore.dev/team/${props.event?.homeTeam.id}/image`}
                alt="league logo"
                width={40}
                height={40}
                priority
              ></Image>
            ) : null}
            <Text
              color={`${props.event?.winnerCode === 'away' || props.event?.winnerCode === 'draw' ? 'var(--on-surface-on-surface-lv-2)' : 'var(--on-surface-on-surface-lv-1)'}`}
              fontSize="14px"
              fontWeight="bold"
              textAlign="center"
            >
              {props.event?.homeTeam.name}
            </Text>
          </VStack>
        </Link>

        <Flex
          flexDirection={`${props.event?.status === 'notstarted' ? 'row' : 'column'}`}
          justify="center"
          alignItems="center"
        >
          {props.event?.status === 'notstarted' ? null : (
            <Flex gap="4px">
              <Text
                color={`${props.event?.winnerCode === 'away' || props.event?.winnerCode === 'draw' ? 'var(--on-surface-on-surface-lv-2)' : props.event?.status === 'inprogress' ? 'var(--specific-live)' : 'var(--on-surface-on-surface-lv-1)'}`}
                fontSize="32px"
                fontWeight="bold"
              >
                {props.event?.homeScore.total}
              </Text>
              <Text fontSize="32px" color="var(--on-surface-on-surface-lv-1)">
                -
              </Text>
              <Text
                color={`${props.event?.winnerCode === 'home' || props.event?.winnerCode === 'draw' ? 'var(--on-surface-on-surface-lv-2)' : props.event?.status === 'inprogress' ? 'var(--specific-live)' : 'var(--on-surface-on-surface-lv-1)'}`}
                fontSize="32px"
                fontWeight="bold"
              >
                {props.event?.awayScore.total}
              </Text>
            </Flex>
          )}

          {setEventStatus(props.event?.status) === '-' ? (
            <VStack alignItems="center" fontSize="12px" color="var(--on-surface-on-surface-lv-1)">
              <Text>
                {props.event !== undefined &&
                  new Date(props.event?.startDate).getDate() +
                    '. ' +
                    (new Date(props.event?.startDate).getMonth() + 1) +
                    '. ' +
                    new Date(props.event?.startDate).getFullYear() +
                    '.'}
              </Text>
              <Text>
                {props.event !== undefined &&
                  new Date(props.event?.startDate).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </VStack>
          ) : (
            <Text
              fontSize="12px"
              color={`${props.event?.status === 'inprogress' ? 'var(--specific-live)' : 'var(--on-surface-on-surface-lv-2)'}`}
            >
              {setEventStatus(props.event?.status)}
            </Text>
          )}
        </Flex>
        <Link
          href={`/team/${props.event?.tournament.sport.slug}/${props.event?.awayTeam.name}/${props.event?.awayTeam.id}`}
        >
          <VStack gap="8px" alignItems="center" justify="center" w="96px" h="auto">
            {props.event !== undefined ? (
              <Image
                src={`https://academy-backend.sofascore.dev/team/${props.event?.awayTeam.id}/image`}
                alt="league logo"
                width={40}
                height={40}
                priority
              ></Image>
            ) : null}
            <Text
              color={`${props.event?.winnerCode === 'home' || props.event?.winnerCode === 'draw' ? 'var(--on-surface-on-surface-lv-2)' : 'var(--on-surface-on-surface-lv-1)'}`}
              fontSize="14px"
              fontWeight="bold"
              textAlign="center"
            >
              {props.event?.awayTeam.name}
            </Text>
          </VStack>
        </Link>
      </Flex>
      <Box minWidth="100%" h="2px" backgroundColor="var(--on-surface-on-surface-lv-4)" borderRadius="2px"></Box>
    </>
  )
}
