import { TournamentEvent } from '@/model/events'
import { Flex, Text, VStack, Image } from '@kuma-ui/core'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export function EventLeague(props: { leagueId: number; leagueName: string; currentDate: Date }) {
  const [tournaments, setTournaments] = useState<TournamentEvent[]>()
  const { data, error } = useSWR(`/api/tournament/${props.leagueId}/events/next/1`)

  console.log(error)

  useEffect(() => {
    setTournaments(data)
  }, [data])

  const checkDate = (date1: string, date2: Date) => {
    const dateNew = new Date(date1)
    console.log()
    if (dateNew.getDate() === date2.getDate() && dateNew.getMonth() === date2.getMonth()) {
      return true
    } else {
      return false
    }
  }

  return (
    <VStack>
      <Flex
        p="20px 16px"
        fontSize="14px"
        fontWeight="bold"
        color="var(--on-surface-on-surface-lv-1)"
        alignItems="center"
      >
        <Image src={`api/tournament/${props.leagueId}/image`} alt="league logo" width={32} height={32}></Image>
        <Text>{props.leagueName}</Text>
      </Flex>
      {tournaments?.map(({ id, homeTeam, awayTeam, startDate }) =>
        checkDate(startDate, props.currentDate) === true ? (
          <Flex key={id} gap="10px">
            <Text>
              {new Date(startDate).toLocaleDateString('hr-HR', { day: '2-digit', month: 'numeric' }) +
                ' ' +
                new Date(startDate).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Text>
              {id}:{homeTeam.name}-{awayTeam.name}
            </Text>
          </Flex>
        ) : null
      )}
    </VStack>
  )
}
