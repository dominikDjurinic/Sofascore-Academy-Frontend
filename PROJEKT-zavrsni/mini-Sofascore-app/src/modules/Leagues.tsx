import { Box, VStack, Text, Flex, Image } from '@kuma-ui/core'
import { Leagues } from '@/model/sports'
import useSWR from 'swr'
import { useEffect, useState } from 'react'

export function LeaguesPanel(props: { selectedSport: string }) {
  const [leagues, setLeagues] = useState<Leagues[]>()

  const { data, error } = useSWR(`/api/sport/${props.selectedSport}/tournaments`)

  console.log(error)

  useEffect(() => {
    setLeagues(data)
  }, [data])

  return (
    <VStack
      width="30%"
      borderRadius="16px"
      bgColor="var(--surface-surface-1)"
      boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
      p="16px 0px"
    >
      <Box p="10px 16px" fontSize="20px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
        Leagues
      </Box>
      {leagues?.map(({ name, id }) => (
        <Flex
          key={id}
          alignItems="center"
          p="8px 16px"
          gap="16px"
          _hover={{ backgroundColor: 'var(--surface-surface-0)' }}
          cursor="pointer"
        >
          <Image src={`api/tournament/${id}/image`} alt="league logo" width={40} height={40}></Image>
          <Text fontSize="14px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
            {name}
          </Text>
        </Flex>
      ))}
    </VStack>
  )
}
