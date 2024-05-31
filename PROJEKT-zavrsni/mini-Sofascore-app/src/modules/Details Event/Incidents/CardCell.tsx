import { Card, Goal, Period } from '@/model/incidents'
import { Box, Flex, Text, VStack } from '@kuma-ui/core'
import Image from 'next/image'
import redCard from '../../../../public/images/ic_card_red@2x.png'
import yellowCard from '../../../../public/images/ic_card_yellow@2x.png'

export function CardCell(props: { data: Card & Goal & Period }) {
  return (
    <>
      <Box width="100%" cursor="pointer" _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}>
        <Flex alignItems="center" justify={`${props.data.teamSide === 'away' ? 'right' : 'left'}`}>
          {props.data.teamSide === 'home' ? (
            <>
              <VStack alignItems="center" justify="center" p="16px">
                <Image
                  src={props.data.color === 'red' ? redCard : yellowCard}
                  alt="icon card"
                  width={24}
                  height={24}
                ></Image>
                <Text fontSize="12px" fontWeight="bold" color="var(--on-surface-on-surface-lv-2)">
                  {props.data.time} &apos;
                </Text>
              </VStack>
              <Box minWidth="1px" h="40px" backgroundColor="var(--on-surface-on-surface-lv-4)" borderRadius="2px"></Box>
              <Text p="0px 12px" fontSize="14px">
                {props.data.player.name}
              </Text>
            </>
          ) : (
            <>
              <Text p="0px 12px" fontSize="14px">
                {props.data.player.name}
              </Text>
              <Box minWidth="1px" h="40px" backgroundColor="var(--on-surface-on-surface-lv-4)" borderRadius="2px"></Box>
              <VStack alignItems="center" justify="center" p="16px">
                <Image
                  src={props.data.color === 'red' ? redCard : yellowCard}
                  alt="icon card"
                  width={24}
                  height={24}
                ></Image>
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
