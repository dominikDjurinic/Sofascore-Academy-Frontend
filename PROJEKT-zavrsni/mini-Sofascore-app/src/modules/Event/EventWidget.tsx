import { Panel } from '@/components/Panel'
import { Box, Text } from '@kuma-ui/core'

export function EventWidget() {
  return (
    <Panel>
      <Box p="20px 16px" fontSize="20px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
        Event widget
      </Box>
      <Text></Text>
    </Panel>
  )
}
