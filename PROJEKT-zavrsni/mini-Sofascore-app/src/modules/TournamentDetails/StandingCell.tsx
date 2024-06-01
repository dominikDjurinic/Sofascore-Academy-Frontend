import { SortedStandings } from '@/model/tournaments'
import { Box, Flex } from '@kuma-ui/core'
import Image from 'next/image'

export function StandingCell(props: { data: SortedStandings; place: number }) {
  return (
    <>
      <Flex w="100%" gap="20px" p="16px" fontSize="14px" color="var(--on-surface-on-surface-lv-1)">
        <Flex w="50%" gap="4px">
          <Flex
            w="30px"
            p="7px 0px"
            justify="center"
            borderRadius="50%"
            backgroundColor="var(--color-secondary-default)"
          >
            {props.place}
          </Flex>
          <Flex w="40%" alignItems="center" gap="4px">
            <Image
              src={`https://academy-backend.sofascore.dev/team/${props.data.team.id}/image`}
              alt="icon team"
              width={18}
              height={18}
            ></Image>
            <Box w="100%">{props.data.team.name}</Box>
          </Flex>
        </Flex>
        <Flex w="50%" justify="space-between">
          <Flex w="5%" justify="center">
            {props.data.played}
          </Flex>
          <Flex w="5%" justify="center">
            {props.data.wins}
          </Flex>
          <Flex w="5%" justify="center">
            {props.data.draws}
          </Flex>
          <Flex w="5%" justify="center">
            {props.data.losses}
          </Flex>
          <Flex w="15%" justify="center" textAlign="center">
            {props.data.scoresFor} : {props.data.scoresAgainst}
          </Flex>
          <Flex w="5%" justify="center">
            {props.data.points !== undefined ? props.data.points : '-'}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
