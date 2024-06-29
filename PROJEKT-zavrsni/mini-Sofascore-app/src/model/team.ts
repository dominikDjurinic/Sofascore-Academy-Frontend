export interface TeamDetails {
  id: number
  name: string
  country: {
    id: number
    name: string
  }
  managerName: string
  venue: string
}

export interface TeamPlayer {
  id: number
  name: string
  slug: string
  country: {
    id: number
    name: string
  }
  position: string
}
