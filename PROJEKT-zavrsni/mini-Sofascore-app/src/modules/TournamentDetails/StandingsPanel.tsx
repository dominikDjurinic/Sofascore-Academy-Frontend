import { TournamentStandings } from '@/model/tournaments'
import { Box, Flex, VStack } from '@kuma-ui/core'
import useSWR from 'swr'
import { StandingCell } from './StandingCell'
import Link from 'next/link'

export function StandingsPanel(props: { tournamentId: number; selSlug: string }) {
  const { data, error, isLoading } = useSWR<TournamentStandings[], Error>(
    `/api/tournament/${props.tournamentId}/standings`
  )
  console.log(error)

  return (
    <>
      <VStack
        width="100%"
        borderRadius="16px"
        bgColor="var(--surface-surface-1)"
        boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
        paddingBottom="16px"
        overflow="hidden"
        height="fit-content"
      >
        <Flex w="100%" gap="20px" p="16px" color="var(--on-surface-on-surface-lv-2)">
          <Flex w="50%" gap="4px">
            <Flex w="5%" justify="center">
              #
            </Flex>
            <Box w="40%">Team</Box>
          </Flex>
          <Flex w="50%" justify="space-between">
            <Flex w="5%" justify="center">
              P
            </Flex>
            <Flex w="5%" justify="center">
              W
            </Flex>
            <Flex w="5%" justify="center">
              D
            </Flex>
            <Flex w="5%" justify="center">
              L
            </Flex>
            <Flex w="15%" justify="center">
              Goals
            </Flex>
            <Flex w="5%" justify="center">
              PTS
            </Flex>
          </Flex>
        </Flex>
        {isLoading ? (
          <Flex justify="center" alignItems="center">
            <div className="loader"></div>
          </Flex>
        ) : data !== undefined ? (
          data[data.findIndex(({ type }) => type === 'total')]?.sortedStandingsRows.map((standing, index) => (
            <Link key={standing.id} href={`/team/${props.selSlug}/${standing.team.name}/${standing.team.id}`}>
              <Box w="100%" _hover={{ backgroundColor: 'var(--color-primary-highlight)' }} cursor="pointer">
                <StandingCell data={standing} place={index + 1} />
              </Box>
            </Link>
          ))
        ) : null}
      </VStack>
    </>
  )
}
