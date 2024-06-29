export interface SportInfo {
  id: number
  name: string
  slug: string
}

export interface Leagues {
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
