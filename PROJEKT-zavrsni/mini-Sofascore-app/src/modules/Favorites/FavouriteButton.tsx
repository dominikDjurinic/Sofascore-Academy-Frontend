import { FavouriteEvent } from '@/model/favorites'
import { settingFavourites } from '@/utils/settingFavourites'
import { Box, Flex } from '@kuma-ui/core'
import Image from 'next/image'
import bellNoclick from '../../../public/images/bellNotClicked.png'
import bellClicked from '../../../public/images/belClicked.png'
import { useEffect, useState } from 'react'

export function FavouriteButton(props: {
  favourites: FavouriteEvent[] | undefined
  eventId: number
  startDate: string
  setNewFav: (newFav: FavouriteEvent[]) => void
}) {
  const [newFavourites, setNewFavourites] = useState<FavouriteEvent[] | undefined>(props.favourites)

  useEffect(() => {
    if (newFavourites !== undefined) {
      localStorage.setItem('currentFavouritesMiniSofa', JSON.stringify(newFavourites))
      props.setNewFav(newFavourites)
    }
  }, [newFavourites])

  const favouritesHandle = (favourites: FavouriteEvent[], eventId: number, date: Date) => {
    console.log('Fav:' + favourites)
    setNewFavourites(settingFavourites(favourites, eventId, date))
  }
  return (
    <Flex position="absolute" w="10%" right="0px">
      <Box minWidth="1px" h="40px" backgroundColor="var(--on-surface-on-surface-lv-4)" borderRadius="2px"></Box>

      <Flex
        cursor="pointer"
        onClick={() => favouritesHandle(props.favourites, props.eventId, new Date(props.startDate))}
        alignItems="center"
        justify="center"
        w="100%"
        gap="5px"
      >
        <Image
          src={newFavourites.find(({ id }) => id === props.eventId) !== undefined ? bellClicked : bellNoclick}
          alt="bell icon"
          width={20}
          height={20}
        ></Image>
      </Flex>
    </Flex>
  )
}
