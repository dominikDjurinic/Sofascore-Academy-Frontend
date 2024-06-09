import { TeamDetails } from '@/model/team'
import { Box, Flex, Link, Text, VStack } from '@kuma-ui/core'
import Image from 'next/image'
import right from '../../../public/images/ic_pointer_right@2x.png'
import rightLight from '../../../public/images/ic_pointer_rightLight@2x.png'
import bellNoclick from '../../../public/images/bellNotClicked.png'
import bellClicked from '../../../public/images/belClicked.png'
import bellClickedLight from '../../../public/images/belClickedLight.png'
import { EventCell } from '../Event/EventCell'
import useSWR from 'swr'
import { SportDateEvent } from '@/model/events'
import { formatName } from '@/utils/formatPathName'
import { useThemeContext } from '@/context/ThemeContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { favouritesDate } from '@/utils/favouritesDate'
import { useEffect, useState } from 'react'
import { FavouriteEvent } from '@/model/favorites'
import { settingFavourites } from '@/utils/settingFavourites'
import { TournamentDetails } from '@/model/tournaments'

export function TeamNextMatch(props: { teamDetails: TeamDetails }) {
  const { data, isLoading } = useSWR<SportDateEvent[]>(`/api/team/${props.teamDetails.id}/events/next/0`)

  const { isDark } = useThemeContext()
  const { mobileWindowSize } = useWindowSizeContext()

  const [previousFav, setPreviousFav] = useState<FavouriteEvent[]>([])
  const [currentFav, setCurrentFav] = useState<FavouriteEvent[]>([])
  const [nextFav, setNextFav] = useState<FavouriteEvent[]>([])

  useEffect(() => {
    //dohvacanje podataka o favoritima
    const previous = localStorage.getItem('previousFavouritesMiniSofa')
    const current = localStorage.getItem('currentFavouritesMiniSofa')
    const next = localStorage.getItem('nextFavouritesMiniSofa')
    previous !== null ? setPreviousFav(JSON.parse(previous)) : setPreviousFav([])
    current !== null ? setCurrentFav(JSON.parse(current)) : setCurrentFav([])
    next !== null ? setNextFav(JSON.parse(next)) : setNextFav([])
  }, [])

  useEffect(() => {
    //postavljanje favorita
    if (currentFav.length) localStorage.setItem('currentFavouritesMiniSofa', JSON.stringify(currentFav))
  }, [currentFav])
  useEffect(() => {
    if (previousFav.length) localStorage.setItem('previousFavouritesMiniSofa', JSON.stringify(previousFav))
  }, [previousFav])
  useEffect(() => {
    if (nextFav.length) localStorage.setItem('nextFavouritesMiniSofa', JSON.stringify(nextFav))
  }, [nextFav])

  const favouritesHandle = (favourites: string, eventId: number, date: Date, tournament: TournamentDetails) => {
    //funkcija s obzirom na datum pocetka utakmice sprema favorit u odgovarajucu grupu
    switch (favourites) {
      case 'currentFavouritesMiniSofa':
        setCurrentFav(settingFavourites(currentFav, eventId, date, tournament))
        break
      case 'previousFavouritesMiniSofa':
        setPreviousFav(settingFavourites(previousFav, eventId, date, tournament))
        break
      case 'nextFavouritesMiniSofa':
        setNextFav(settingFavourites(nextFav, eventId, date, tournament))
        break
    }
  }

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
          Next Match
        </Flex>
        {isLoading ? (
          <Flex justify="center" alignItems="center">
            <div className="loader"></div>
          </Flex>
        ) : data !== undefined ? (
          <VStack>
            <Flex
              p="20px 16px"
              fontSize="14px"
              fontWeight="bold"
              color="var(--on-surface-on-surface-lv-1)"
              alignItems="center"
              gap="10px"
            >
              <Image
                src={`/api/tournament/${data[0]?.tournament.id}/image`}
                alt="league logo"
                width={32}
                height={32}
              ></Image>
              <Text>{data[0]?.tournament.country.name}</Text>
              <Image src={isDark ? rightLight : right} alt="icon right" width={15} height={15}></Image>
              <Text color="var(--on-surface-on-surface-lv-2)">{data[0]?.tournament.name}</Text>
            </Flex>
            <Flex
              width="100%"
              position="relative"
              alignItems="center"
              _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
            >
              <Link
                w="90%"
                href={`${`/tournament/${data[0]?.tournament.sport.slug}/${data[0]?.tournament.name}/${formatName(
                  data[0]?.homeTeam.name,
                  data[0]?.awayTeam.name
                )}/${data[0]?.id}`}`}
              >
                <Box w="100%" cursor="pointer">
                  <EventCell event={data[0]} matchCell={true} />
                </Box>
              </Link>
              <Box minWidth="1px" h="40px" backgroundColor="var(--on-surface-on-surface-lv-4)" borderRadius="2px"></Box>
              <Flex
                position="absolute"
                right="0px"
                cursor="pointer"
                onClick={() =>
                  favouritesHandle(
                    favouritesDate(data[0].startDate),
                    data[0].id,
                    new Date(data[0].startDate),
                    data[0].tournament
                  )
                }
                alignItems="center"
                justify="center"
                w="10%"
                gap="5px"
              >
                <Image
                  src={
                    previousFav.find(({ id }) => id === data[0].id) !== undefined ||
                    currentFav.find(({ id }) => id === data[0].id) !== undefined ||
                    nextFav.find(({ id }) => id === data[0].id) !== undefined
                      ? isDark
                        ? bellClickedLight
                        : bellClicked
                      : bellNoclick
                  }
                  alt="bell icon"
                  width={19}
                  height={19}
                ></Image>
              </Flex>
            </Flex>
          </VStack>
        ) : null}
      </VStack>
    </>
  )
}
