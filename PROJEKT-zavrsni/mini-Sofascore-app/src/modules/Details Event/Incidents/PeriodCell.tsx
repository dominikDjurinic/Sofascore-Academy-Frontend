import { Card, Goal, Period } from '@/model/incidents'
import { Box, Flex } from '@kuma-ui/core'

export function PeriodCell(props: { data: Card & Goal & Period }) {
  return (
    <>
      <Box width="100%" p="8px 8px">
        <Flex
          w="100%"
          justify="center"
          borderRadius="16px"
          backgroundColor="var(--color-secondary-highlight)"
          fontWeight="bold"
          fontSize="12px"
          p="4px 0px"
          color="var(--on-surface-on-surface-lv-1)"
        >
          {props.data.text}
        </Flex>
      </Box>
    </>
  )
}
