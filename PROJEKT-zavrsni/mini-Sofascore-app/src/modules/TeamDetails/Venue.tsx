import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { TeamDetails } from '@/model/team'
import { Flex, Text, VStack } from '@kuma-ui/core'

export function Venue(props: { teamDetails: TeamDetails }) {
  const { mobileWindowSize } = useWindowSizeContext()
  return (
    <>
      <VStack
        width="100%"
        borderRadius={`${mobileWindowSize ? '0px' : '16px'}`}
        bgColor="var(--surface-surface-1)"
        boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
        p="16px 0px"
        overflow="hidden"
        height="fit-content"
      >
        <Flex w="100%" justify="center" fontSize="16px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
          Venue
        </Flex>
        <Flex justify="space-between" p="16px" fontSize="14px" color="var(--on-surface-on-surface-lv-1)">
          <Text>Stadium</Text>
          <Text>{props.teamDetails.venue}</Text>
        </Flex>
      </VStack>
    </>
  )
}
