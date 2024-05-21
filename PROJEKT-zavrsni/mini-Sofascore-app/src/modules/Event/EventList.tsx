import { DateNavigation } from '@/components/DateNavigation'
import { Panel } from '@/components/Panel'
import { Leagues } from '@/model/sports'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { SportDateEvent } from '@/model/events'
import { Text, Image, Box, Flex, VStack } from '@kuma-ui/core'
import { EventCell } from './EventCell'
import { fullDaysInWeek } from '@/model/daysInWeek'

export function EventList(props: { leagues: Leagues[]; selSlug: string }) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  const settingDate = (currDate: Date) => {
    setCurrentDate(new Date(currDate))
  }

  const formattingDate = () => {
    const format = currentDate.toISOString().split('T')[0]
    return format
  }

  const [formattedDate, setFormattedDate] = useState(formattingDate)

  const { data, error } = useSWR<SportDateEvent[], Error>(`/api/sport/${props.selSlug}/events/${formattedDate}`)

  console.log(error)

  useEffect(() => {
    setFormattedDate(formattingDate)
  }, [currentDate])

  const checkTournamentId = (dataId: number, tournamentId: number) => {
    if (dataId === tournamentId) {
      return true
    } else {
      return false
    }
  }

  return (
    <Panel>
      <DateNavigation key={props.selSlug} currentDate={settingDate} />
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
          {new Date(currentDate) !== new Date()
            ? `${
                fullDaysInWeek[currentDate.getDay()] +
                ' - ' +
                currentDate.getDate() +
                '. ' +
                (currentDate.getMonth() + 1) +
                '. ' +
                currentDate.getFullYear() +
                '.'
              }`
            : 'Today'}
        </Text>
        <Text color="var(--on-surface-on-surface-lv-2)">
          {data?.length !== undefined ? `${data?.length + ' Events'}` : '0 Events'}
        </Text>
      </Flex>
      {props.leagues.map(({ id, name, country }) => (
        <VStack key={id} width="100%">
          <Flex
            p="20px 16px"
            fontSize="14px"
            fontWeight="bold"
            color="var(--on-surface-on-surface-lv-1)"
            alignItems="center"
            gap="5px"
          >
            <Image src={`/api/tournament/${id}/image`} alt="league logo" width={32} height={32}></Image>
            <Text>{country.name}</Text>
            <Text color="var(--on-surface-on-surface-lv-2)">{name}</Text>
            {data !== undefined && data?.length > 0 ? null : (
              <Text color="var(--on-surface-on-surface-lv-2)"> - No match</Text>
            )}
          </Flex>
          {data?.map(event => (
            <Box key={event.id} width="100%">
              {checkTournamentId(event.tournament.id, id) === true ? <EventCell event={event} /> : null}
            </Box>
          ))}
        </VStack>
      ))}
    </Panel>
  )
}
