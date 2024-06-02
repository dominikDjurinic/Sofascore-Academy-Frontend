import { Box, Flex, VStack, Text } from '@kuma-ui/core'
import Image from 'next/image'
import { TabNoIcon } from './TabNoIcon'
import { alpha2Country } from '@/utils/alphaTwoCountry'
import { ImageWithPlaceholder } from './ImageWithPlaceholder'
import { PlayerDetails } from '@/model/players'
import { TeamDetails } from '@/model/team'
import Link from 'next/link'

export function HeadingPanel(props: {
  name: string
  country: string
  imageLogo: string
  tabs: string[]
  player?: PlayerDetails
  team?: TeamDetails
  selSlug?: string
}) {
  return (
    <VStack
      width="100%"
      borderRadius="16px"
      bgColor="var(--surface-surface-1)"
      boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
      overflow="hidden"
      height="fit-content"
      p="0px 16px"
    >
      <Flex p="20px 0px" alignItems="center" gap="24px">
        <Flex
          border="1px solid var(--on-surface-on-surface-lv-3)"
          borderRadius="4px"
          w="80px"
          h="80px"
          justify="center"
          alignItems="center"
        >
          <ImageWithPlaceholder source={props.imageLogo} placeholder="/images/noImage.svg" alt="logo" w={70} h={70} />
        </Flex>
        <VStack>
          <Box fontSize="32px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
            {props.name}
          </Box>
          {props.tabs.length !== 0 ? (
            <Flex alignItems="center" gap="4px">
              <ImageWithPlaceholder
                source={`https://www.sofascore.com/static/images/flags/${alpha2Country(props.country)}.png`}
                placeholder="/images/globe.png"
                alt="country flag"
                w={16}
                h={16}
              />
              <Text color="var(--on-surface-on-surface-lv-1)">{props.country}</Text>
            </Flex>
          ) : null}
        </VStack>
      </Flex>
      {props.team !== undefined ? (
        <Link href={`/team/${props.selSlug}/${props.team.name}/${props.team.id}`}>
          <Flex alignItems="center" gap="16px">
            <Image
              src={`https://academy-backend.sofascore.dev/team/${props.team?.id}/image`}
              alt="team logo"
              width={40}
              height={40}
            ></Image>
            <Text color="var(--on-surface-on-surface-lv-1)" fontWeight="bold" fontSize="14px">
              {props.team?.name}
            </Text>
          </Flex>
        </Link>
      ) : null}
      {props.player !== undefined ? (
        <Flex w="100%" gap="40px" p="20px 0px">
          <VStack
            w="30%"
            p="8px 0px"
            alignItems="center"
            gap="4px"
            backgroundColor="var(--color-secondary-highlight)"
            borderRadius="4px"
          >
            <Text color="var(--on-surface-on-surface-lv-2)" fontSize="12px" fontWeight="bold">
              Nationality
            </Text>
            <Flex alignItems="center" gap="4px">
              <ImageWithPlaceholder
                source={`https://www.sofascore.com/static/images/flags/${alpha2Country(props.country)}.png`}
                placeholder="/images/globe.png"
                alt="country flag"
                w={16}
                h={16}
              />
              <Text color="var(--on-surface-on-surface-lv-1)" fontWeight="bold" fontSize="14px">
                {props.player.country.name}
              </Text>
            </Flex>
          </VStack>
          <VStack
            w="30%"
            p="8px 0px"
            alignItems="center"
            gap="4px"
            backgroundColor="var(--color-secondary-highlight)"
            borderRadius="4px"
          >
            <Text color="var(--on-surface-on-surface-lv-2)" fontSize="12px" fontWeight="bold">
              Position
            </Text>
            <Text color="var(--on-surface-on-surface-lv-1)" fontWeight="bold" fontSize="14px">
              {props.player.position}
            </Text>
          </VStack>
        </Flex>
      ) : null}
      <Flex>
        {props.tabs.map(name => (
          <TabNoIcon name={name} key={name} />
        ))}
      </Flex>
    </VStack>
  )
}
