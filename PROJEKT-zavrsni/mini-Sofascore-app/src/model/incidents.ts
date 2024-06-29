export interface Card {
  player: {
    id: number
    name: string
    slug: string
    country: {
      id: number
      name: string
    }
    position: string
  }
  teamSide: string
  color: string
  id: number
  time: number
  type: string
}

export interface Goal {
  player: {
    id: number
    name: string
    slug: string
    country: {
      id: number
      name: string
    }
    position: string
  }
  scoringTeam: string
  homeScore: number
  awayScore: number
  goalType: string
  id: number
  time: number
  type: string
}

export interface Period {
  text: string
  id: number
  time: number
  type: string
}
