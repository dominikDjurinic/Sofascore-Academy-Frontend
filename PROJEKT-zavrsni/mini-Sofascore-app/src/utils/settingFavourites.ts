import { FavouriteEvent } from '@/model/favorites'

export const settingFavourites = (favourites: FavouriteEvent[], eventId: number, date: Date) => {
  let newFavourites: FavouriteEvent[] = [...favourites]
  console.log(favourites)
  if (favourites.find(({ id }) => id === eventId) === undefined) {
    if (favourites.length === 0) {
      newFavourites.push({ id: eventId, date: date })
      return newFavourites
    }
    for (let i = 0; i < favourites.length; i++) {
      console.log(date + ' vs ' + favourites[i].date)
      if (new Date(favourites[i].date) > new Date(date)) {
        console.log('usao u splice')
        newFavourites.splice(i, 0, { id: eventId, date: date })
        break
      } else if (i === favourites.length - 1) {
        console.log('usao u push')
        newFavourites.push({ id: eventId, date: date })
      }
    }
    return newFavourites
  } else {
    return favourites.filter(({ id }) => id !== eventId)
  }
}
