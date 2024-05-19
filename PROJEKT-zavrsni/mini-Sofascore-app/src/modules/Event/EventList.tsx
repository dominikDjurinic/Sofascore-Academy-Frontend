import { DateNavigation } from '@/components/DateNavigation'
import { Panel } from '@/components/Panel'
import { Leagues } from '@/model/sports'
import { EventLeague } from './EventLeague'
import { useState } from 'react'

export function EventList(props: { leagues: Leagues[]; selSlug: string }) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  const settingDate = (currDate: Date) => {
    setCurrentDate(new Date(currDate))
  }

  return (
    <Panel>
      <DateNavigation key={props.selSlug} currentDate={settingDate} />
      {props.leagues.map(({ id, name, country }) => (
        <EventLeague key={id} leagueId={id} currentDate={currentDate} leagueName={name} leagueCountry={country.name} />
      ))}
    </Panel>
  )
}
