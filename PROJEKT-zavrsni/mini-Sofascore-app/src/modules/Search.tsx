import { ImageWithPlaceholder } from '@/components/ImageWithPlaceholder'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { PlayerSearch, TeamSearch } from '@/model/search'
import { alpha2Country } from '@/utils/alphaTwoCountry'
import { Flex, VStack, Text, Box } from '@kuma-ui/core'
import Image from 'next/image'
import dot from '../../public/images/dot.png'
import Link from 'next/link'
import useSWR from 'swr'
import { useState } from 'react'

export function Search(props: { searchQuery: string }) {
  const {
    data: players,
    error,
    isLoading: isLoadingPlayers,
  } = useSWR<PlayerSearch[], Error>(`/api/search/player/${props.searchQuery}`)
  const {
    data: teams,
    error: errorTeams,
    isLoading: isLoadingTeams,
  } = useSWR<TeamSearch[], Error>(`/api/search/team/${props.searchQuery}`)

  console.log(error)
  console.log(errorTeams)

  const { mobileWindowSize } = useWindowSizeContext()
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <VStack
      w={`${mobileWindowSize ? '300px' : '500px'}`}
      maxHeight="500px"
      fontSize="12px"
      position="absolute"
      top="0px"
      left="15px"
      backgroundColor="var(--surface-surface-1)"
      zIndex="3"
      borderRadius="8px"
      overflow="hidden"
      border="1px solid var(--on-surface-on-surface-lv-3)"
      overflowY="auto"
    >
      {isLoadingPlayers || isLoadingTeams ? (
        <Flex justify="center" alignItems="center" p="10px 0px">
          <div className="loader"></div>
        </Flex>
      ) : (
        <>
          <Flex
            w="100%"
            color="var(--on-surface-on-surface-lv-1)"
            fontSize="14px"
            fontWeight="bold"
            gap="10px"
            p="10px 10px"
            backgroundColor="var(--color-primary-highlight)"
          >
            <Box
              borderRadius="8px"
              border="1px solid var(--on-surface-on-surface-lv-2)"
              p="3px 10px"
              cursor="pointer"
              _hover={{ backgroundColor: 'var(--color-primary-default)', color: 'var(--surface-surface-1)' }}
              backgroundColor={`${selectedCategory === 'all' ? 'var(--color-primary-default)' : 'inherit'}`}
              color={`${selectedCategory === 'all' ? 'var(--surface-surface-1)' : 'inherit'}`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </Box>
            <Box
              borderRadius="8px"
              border="1px solid var(--on-surface-on-surface-lv-2)"
              p="3px 10px"
              cursor="pointer"
              _hover={{ backgroundColor: 'var(--color-primary-default)', color: 'var(--surface-surface-1)' }}
              backgroundColor={`${selectedCategory === 'player' ? 'var(--color-primary-default)' : 'inherit'}`}
              color={`${selectedCategory === 'player' ? 'var(--surface-surface-1)' : 'inherit'}`}
              onClick={() => setSelectedCategory('player')}
            >
              Player
            </Box>
            <Box
              borderRadius="8px"
              border="1px solid var(--on-surface-on-surface-lv-2)"
              p="3px 10px"
              cursor="pointer"
              _hover={{ backgroundColor: 'var(--color-primary-default)', color: 'var(--surface-surface-1)' }}
              backgroundColor={`${selectedCategory === 'team' ? 'var(--color-primary-default)' : 'inherit'}`}
              color={`${selectedCategory === 'team' ? 'var(--surface-surface-1)' : 'inherit'}`}
              onClick={() => setSelectedCategory('team')}
            >
              Team
            </Box>
          </Flex>

          {players?.length === 0 && teams?.length === 0 && selectedCategory === 'all' ? (
            <Text
              fontSize="14px"
              color="var(--on-surface-on-surface-lv-1)"
              p="10px 10px"
            >{`No player or team with '${props.searchQuery}'`}</Text>
          ) : null}
          {players?.length === 0 || selectedCategory === 'team' ? (
            selectedCategory === 'player' ? (
              <Text
                fontSize="14px"
                color="var(--on-surface-on-surface-lv-1)"
                p="10px 10px"
              >{`No player with '${props.searchQuery}'`}</Text>
            ) : null
          ) : (
            <Text fontWeight="bold" fontSize="14px" color="var(--on-surface-on-surface-lv-1)" p="10px 10px">
              Players
            </Text>
          )}
          {selectedCategory === 'player' || selectedCategory === 'all'
            ? players?.map(({ id, name, slug, country, sport }) => (
                <Link key={id} href={`/player/${sport.slug}/${slug}/${id}`}>
                  <Flex
                    cursor="pointer"
                    _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
                    alignItems="center"
                    gap="10px"
                    p="5px 8px"
                    fontSize="14px"
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
                        w={32}
                        h={32}
                      />
                    </Flex>
                    <VStack gap="5px">
                      <Flex gap="10px" alignItems="center">
                        <Text fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
                          {name}
                        </Text>
                        <Image src={dot} alt="dot icon" width={6} height={6}></Image>
                        <Text color="var(--on-surface-on-surface-lv-2)">{sport.name}</Text>
                      </Flex>
                      <Flex gap="4px">
                        <ImageWithPlaceholder
                          source={`https://www.sofascore.com/static/images/flags/${alpha2Country(country.name)}.png`}
                          placeholder="/images/globe.png"
                          alt="country flag"
                          w={16}
                          h={16}
                        />
                        <Text color="var(--on-surface-on-surface-lv-2)">{country.name}</Text>
                      </Flex>
                    </VStack>
                  </Flex>
                </Link>
              ))
            : null}

          {teams?.length === 0 || selectedCategory === 'player' ? (
            selectedCategory === 'team' ? (
              <Text
                fontSize="14px"
                color="var(--on-surface-on-surface-lv-1)"
                p="10px 10px"
              >{`No team with '${props.searchQuery}'`}</Text>
            ) : null
          ) : (
            <Text fontWeight="bold" fontSize="14px" color="var(--on-surface-on-surface-lv-1)" p="10px 10px">
              Teams
            </Text>
          )}

          {selectedCategory === 'team' || selectedCategory === 'all'
            ? teams?.map(({ id, name, sport, country }) => (
                <Link key={id} href={`/team/${sport.slug}/${name}/${id}`}>
                  <Flex
                    cursor="pointer"
                    _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
                    alignItems="center"
                    gap="10px"
                    p="5px 8px"
                    fontSize="14px"
                  >
                    <Image
                      src={`https://academy-backend.sofascore.dev/team/${id}/image`}
                      alt="icon team"
                      width={32}
                      height={32}
                    ></Image>
                    <VStack gap="5px">
                      <Flex gap="10px" alignItems="center">
                        <Text fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
                          {name}
                        </Text>
                        <Image src={dot} alt="dot icon" width={6} height={6}></Image>
                        <Text color="var(--on-surface-on-surface-lv-2)">{sport.name}</Text>
                      </Flex>
                      <Flex gap="4px">
                        <ImageWithPlaceholder
                          source={`https://www.sofascore.com/static/images/flags/${alpha2Country(country.name)}.png`}
                          placeholder="/images/globe.png"
                          alt="country flag"
                          w={16}
                          h={16}
                        />
                        <Text color="var(--on-surface-on-surface-lv-2)">{country.name}</Text>
                      </Flex>
                    </VStack>
                  </Flex>
                </Link>
              ))
            : null}
        </>
      )}
    </VStack>
  )
}
