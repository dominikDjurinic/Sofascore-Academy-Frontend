export interface FavouriteEvent {
  id: number
  date: Date
  tournament: {
    id: number
    name: string
    slug: string
    sport: {
      id: number
      name: string
      slug: string
    }
    country: {
      id: number
      name: string
    }
  }
}
