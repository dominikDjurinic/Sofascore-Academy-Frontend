import { Card, Goal, Period } from '@/model/incidents'
import { Box } from '@kuma-ui/core'

export function GoalCell(props: { data: Card & Goal & Period }) {
  return (
    <>
      <Box>{props.data.goalType}</Box>
    </>
  )
}
