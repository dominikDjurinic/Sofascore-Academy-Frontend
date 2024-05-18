import { DateNavigation } from '@/components/DateNavigation'
import { Panel } from '@/components/Panel'
import { Leagues } from '@/model/sports'
import { EventLeague } from './EventLeague'
import { useState } from 'react'

export function EventList(props: { leagues: Leagues[] }) {
  /*const [leagues, setLeagues] = useState<Leagues[]>()

  const { data, error } = useSWR(`/api/sport/${props.selectedSport}/tournaments`)

  console.log(error)

  useEffect(() => {
    setLeagues(data)
  }, [data])*/

  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  const settingDate = (currDate: Date) => {
    setCurrentDate(new Date(currDate))
  }

  return (
    <Panel>
      <DateNavigation currentDate={settingDate} />
      {props.leagues.map(({ id, name }) => (
        <EventLeague key={id} leagueId={id} currentDate={currentDate} leagueName={name} />
      ))}
    </Panel>
  )
}
