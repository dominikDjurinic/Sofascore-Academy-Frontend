import { TournamentDetails } from '@/model/tournaments'
import { Flex, Text, VStack } from '@kuma-ui/core'
import Image from 'next/image'

export function Tournaments(props: { teamTournaments: TournamentDetails[] }) {
  return (
    <>
      <VStack
        width="100%"
        borderRadius="16px"
        bgColor="var(--surface-surface-1)"
        boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
        p="16px 10px"
        overflow="hidden"
        minHeight="250px"
      >
        <Flex w="100%" justify="center" fontSize="16px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
          Tournaments
        </Flex>
        <Flex>
          {props.teamTournaments.map(tournament => (
            <VStack key={tournament.id} gap="10px" alignItems="center" justifyContent="center" w="100px" h="80px">
              <Image
                src={`https://academy-backend.sofascore.dev/tournament/${tournament.id}/image`}
                alt="tournament logo"
                width={40}
                height={40}
              ></Image>
              <Text color="var(--on-surface-on-surface-lv-2)" fontSize="12px">
                {tournament.name}
              </Text>
            </VStack>
          ))}
        </Flex>
      </VStack>
    </>
  )
}
