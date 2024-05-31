import { Card, Goal, Period } from '@/model/incidents'
import { Box, Flex, VStack, Text } from '@kuma-ui/core'
import Image from 'next/image'
import { useSlugContext } from '@/context/SlugContext'

export function GoalCell(props: { data: Card & Goal & Period }) {
  const { slug } = useSlugContext()

  console.log(props.data.goalType)
  return (
    <>
      <Box width="100%" cursor="pointer" _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}>
        <Flex
          alignItems="center"
          justify={`${props.data.scoringTeam === 'away' ? 'right' : 'left'}`}
          position="relative"
        >
          {props.data.scoringTeam === 'home' ? (
            slug === 'basketball' ? (
              <>
                <VStack alignItems="center" justify="center" p="16px">
                  <Image src={`/images/${props.data.goalType}.png`} alt="icon goal" width={24} height={24}></Image>
                </VStack>
                <Box
                  minWidth="1px"
                  h="40px"
                  backgroundColor="var(--on-surface-on-surface-lv-4)"
                  borderRadius="2px"
                ></Box>
                <Flex>
                  <Text p="0px 12px" fontSize="14px" fontWeight="bold">
                    {props.data.homeScore} - {props.data.awayScore}
                  </Text>
                  <Text
                    fontSize="12px"
                    fontWeight="bold"
                    color="var(--on-surface-on-surface-lv-2)"
                    position="absolute"
                    left="48%"
                  >
                    {props.data.time} &apos;
                  </Text>
                </Flex>
              </>
            ) : (
              <>
                <VStack alignItems="center" justify="center" p="16px">
                  <Image src={`/images/${props.data.goalType}.png`} alt="icon goal" width={24} height={24}></Image>
                  <Text fontSize="12px" fontWeight="bold" color="var(--on-surface-on-surface-lv-2)">
                    {props.data.time} &apos;
                  </Text>
                </VStack>
                <Box
                  minWidth="1px"
                  h="40px"
                  backgroundColor="var(--on-surface-on-surface-lv-4)"
                  borderRadius="2px"
                ></Box>
                <Flex>
                  <Text p="0px 12px" fontSize="14px" fontWeight="bold">
                    {props.data.homeScore} - {props.data.awayScore}
                  </Text>
                  <Text p="0px 12px" fontSize="14px">
                    {props.data.player.name}
                  </Text>
                </Flex>
              </>
            )
          ) : slug === 'basketball' ? (
            <>
              <Flex gap="20px">
                <Text
                  fontSize="12px"
                  fontWeight="bold"
                  color="var(--on-surface-on-surface-lv-2)"
                  position="absolute"
                  left="48%"
                >
                  {props.data.time} &apos;
                </Text>
                <Text p="0px 12px" fontSize="14px" fontWeight="bold">
                  {props.data.homeScore} - {props.data.awayScore}
                </Text>
              </Flex>
              <Box minWidth="1px" h="40px" backgroundColor="var(--on-surface-on-surface-lv-4)" borderRadius="2px"></Box>
              <VStack alignItems="center" justify="center" p="16px">
                <Image src={`/images/${props.data.goalType}.png`} alt="icon goal" width={24} height={24}></Image>
              </VStack>
            </>
          ) : (
            <>
              <Flex>
                <Text p="0px 12px" fontSize="14px">
                  {props.data.player.name}
                </Text>
                <Text p="0px 12px" fontSize="14px" fontWeight="bold">
                  {props.data.homeScore} - {props.data.awayScore}
                </Text>
              </Flex>
              <Box minWidth="1px" h="40px" backgroundColor="var(--on-surface-on-surface-lv-4)" borderRadius="2px"></Box>
              <VStack alignItems="center" justify="center" p="16px">
                <Image src={`/images/${props.data.goalType}.png`} alt="icon goal" width={24} height={24}></Image>
                <Text fontSize="12px" fontWeight="bold" color="var(--on-surface-on-surface-lv-2)">
                  {props.data.time} &apos;
                </Text>
              </VStack>
            </>
          )}
        </Flex>
      </Box>
    </>
  )
}
