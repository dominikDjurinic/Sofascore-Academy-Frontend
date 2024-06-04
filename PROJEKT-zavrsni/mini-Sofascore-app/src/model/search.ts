export interface PlayerSearch {
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
  position: string
}

export interface TeamSearch {
  id: number
  name: string
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
