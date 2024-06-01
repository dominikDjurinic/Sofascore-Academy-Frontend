export interface TournamentEvent {
  id: number
  slug: string
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
  homeTeam: {
    id: number
    name: string
    country: {
      id: number
      name: string
    }
  }
  awayTeam: {
    id: number
    name: string
    country: {
      id: number
      name: string
    }
  }
  status: string
  startDate: string
  homeScore: {
    total: number
    period1: number
    period2: number
    period3: number
    period4: number
    overtime: number
  }
  awayScore: {
    total: number
    period1: number
    period2: number
    period3: number
    period4: number
    overtime: number
  }
  winnerCode: string
  round: number
}

export interface TournamentDetails {
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

export interface TournamentStandings {
  id: number
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
  type: string
  sortedStandingsRows: [
    {
      id: number
      team: {
        id: number
        name: string
        country: {
          id: number
          name: string
        }
      }
      points: number
      scoresFor: number
      scoresAgainst: number
      played: number
      wins: number
      draws: number
      losses: number
      percentage: number
    },
  ]
}

export interface SortedStandings {
  id: number
  team: {
    id: number
    name: string
    country: {
      id: number
      name: string
    }
  }
  points: number
  scoresFor: number
  scoresAgainst: number
  played: number
  wins: number
  draws: number
  losses: number
  percentage: number
}
