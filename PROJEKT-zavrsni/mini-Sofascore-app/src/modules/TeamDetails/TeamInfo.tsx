import { TeamDetails, TeamPlayer } from '@/model/team'
import { Box, Flex, Text, VStack } from '@kuma-ui/core'
import Image from 'next/image'
import placeholder from '../../../public/images/noImage.svg'
import players from '../../../public/images/ic_team@2x.png'
import progress from '../../../public/images/Assets Drawable@2x.png'

export function TeamInfo(props: { teamDetails: TeamDetails; teamPlayers: TeamPlayer[] }) {
  const foreignPlayers = () => {
    let num: number = 0
    props.teamPlayers.map(({ country }) => {
      if (country.id !== props.teamDetails.country.id) {
        num = num + 1
      }
    })
    return num
  }

  return (
    <>
      <VStack
        width="100%"
        borderRadius="16px"
        bgColor="var(--surface-surface-1)"
        boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
        p="16px 0px"
        overflow="hidden"
        minHeight="250px"
      >
        <Flex w="100%" justify="center" fontSize="16px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
          Team Info
        </Flex>
        <Flex alignItems="center" p="16px" gap="16px">
          <Image src={placeholder} alt="coach image"></Image>
          <Text fontSize="14px" color="var(--on-surface-on-surface-lv-1)" fontWeight="bold">
            Coach: {props.teamDetails.managerName}
          </Text>
        </Flex>
        <Box minWidth="100%" h="1px" backgroundColor="var(--on-surface-on-surface-lv-4)" borderRadius="2px"></Box>
        <Flex w="100%" p="8px 0px">
          <VStack w="50%" alignItems="center" gap="8px">
            <Image src={players} alt="players icon" width={35} height={35}></Image>
            <Text color="var(--color-primary-default)" fontSize="14px" fontWeight="bold">
              {props.teamPlayers.length}
            </Text>
            <Text color="var(--on-surface-on-surface-lv-2)" fontSize="12px">
              Total Players
            </Text>
          </VStack>
          <VStack w="50%" alignItems="center" gap="8px">
            <Image src={progress} alt="progress icon" width={35} height={35}></Image>
            <Text color="var(--color-primary-default)" fontSize="14px" fontWeight="bold">
              {foreignPlayers()}
            </Text>
            <Text color="var(--on-surface-on-surface-lv-2)" fontSize="12px">
              Foreign Players
            </Text>
          </VStack>
        </Flex>
      </VStack>
    </>
  )
}
