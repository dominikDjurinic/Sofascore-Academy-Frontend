import { PlayerDetails } from '@/model/players'
import { alpha2Country } from '@/utils/alphaTwoCountry'
import { Box, Flex, Link, Text, VStack } from '@kuma-ui/core'
import Image from 'next/image'
import placeholder from '../../../public/images/noImage.svg'
import { TeamDetails } from '@/model/team'
import { ImageWithPlaceholder } from '@/components/ImageWithPlaceholder'
import { useWindowSizeContext } from '@/context/WindowSizeContext'

export function Squad(props: { players: PlayerDetails[]; teamDetails: TeamDetails; selSlug: string }) {
  const { mobileWindowSize } = useWindowSizeContext()

  return (
    <VStack
      width="100%"
      borderRadius={`${mobileWindowSize ? '0px' : '16px'}`}
      bgColor="var(--surface-surface-1)"
      boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
      p="24px 16px"
      overflow="hidden"
      height="fit-content"
    >
      <Text color="var(--on-surface-on-surface-lv-1)" fontSize="12px" fontWeight="bold">
        Coach
      </Text>
      <Box w="100%">
        <Flex
          w="100%"
          gap="20px"
          p="16px"
          fontSize="14px"
          color="var(--on-surface-on-surface-lv-1)"
          alignItems="center"
        >
          <Image src={placeholder} alt="coach image" width={40} height={40}></Image>
          <VStack>
            <Text color="var(--on-surface-on-surface-lv-1)" fontSize="14px">
              {props.teamDetails.managerName}
            </Text>
          </VStack>
        </Flex>
      </Box>
      <Text color="var(--on-surface-on-surface-lv-1)" fontSize="12px" fontWeight="bold">
        Players
      </Text>
      {props.players.map(({ id, name, country, slug }) => (
        <Link key={id} href={`/player/${props.selSlug}/${slug}/${id}`}>
          <Box w="100%" _hover={{ backgroundColor: 'var(--color-primary-highlight)' }} cursor="pointer">
            <Flex
              w="100%"
              gap="20px"
              p="16px"
              fontSize="14px"
              color="var(--on-surface-on-surface-lv-1)"
              alignItems="center"
            >
              <Flex
                w="fit-content"
                borderRadius="50%"
                border="solid 1px var(--on-surface-on-surface-lv-4)"
                overflow="hidden"
                alignItems="center"
              >
                <ImageWithPlaceholder
                  source={`https://academy-backend.sofascore.dev/player/${id}/image`}
                  placeholder="/images/noImage.svg"
                  alt="player image"
                  w={40}
                  h={40}
                />
              </Flex>

              <VStack justifyContent="center" gap="5px">
                <Text color="var(--on-surface-on-surface-lv-1)" fontSize="14px">
                  {name}
                </Text>
                <Flex alignItems="center" gap="4px">
                  <ImageWithPlaceholder
                    source={`https://www.sofascore.com/static/images/flags/${alpha2Country(country.name)}.png`}
                    placeholder="/images/globe.png"
                    alt="country flag"
                    w={16}
                    h={16}
                  />
                  <Text color="var(--on-surface-on-surface-lv-2)" fontSize="12px">
                    {country.name}
                  </Text>
                </Flex>
              </VStack>
            </Flex>
          </Box>
        </Link>
      ))}
    </VStack>
  )
}
