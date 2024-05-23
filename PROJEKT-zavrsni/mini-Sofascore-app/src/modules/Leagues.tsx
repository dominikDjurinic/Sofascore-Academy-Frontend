import { Box, Text, Flex, Image } from '@kuma-ui/core'
import { Leagues } from '@/model/sports'
import { Panel } from '@/components/Panel'
//import Image from 'next/image'

export function LeaguesPanel(props: { selectedSport: string; leagues: Leagues[] }) {
  return (
    <Panel>
      <Box p="20px 16px" fontSize="20px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
        Leagues
      </Box>
      {props.leagues.map(({ name, id }) => (
        <Flex
          key={id}
          alignItems="center"
          p="8px 16px"
          gap="16px"
          _hover={{ backgroundColor: 'var(--surface-surface-0)' }}
          cursor="pointer"
        >
          <Image
            src={`https://academy-backend.sofascore.dev/tournament/${id}/image`}
            alt="league logo"
            width={40}
            height={40}
          ></Image>
          <Text fontSize="14px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
            {name}
          </Text>
        </Flex>
      ))}
    </Panel>
  )
}
