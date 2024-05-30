import { Card, Goal, Period } from '@/model/incidents'
import useSWR from 'swr'
import { CardCell } from './Incidents/CardCell'
import { GoalCell } from './Incidents/GoalCell'
import { PeriodCell } from './Incidents/PeriodCell'

export function EventIncidents(props: { eventId: number | undefined }) {
  const { data, error } = useSWR<(Card & Goal & Period)[], Error>(`/api/event/${props.eventId}/incidents`)

  console.log(error)

  return (
    <>
      {data
        ?.slice(0)
        .reverse()
        .map(incident => {
          if (incident.type === 'card') {
            return <CardCell key={incident.id} data={incident} />
          } else if (incident.type === 'goal') {
            return <GoalCell key={incident.id} data={incident} />
          } else {
            return <PeriodCell key={incident.id} data={incident} />
          }
        })}
    </>
  )
}
