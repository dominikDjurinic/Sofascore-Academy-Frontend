import { VStack } from '@kuma-ui/core'
import { PropsWithChildren } from 'react'

export function SettingsPanel({ children }: PropsWithChildren) {
  return (
    <VStack
      width="90%"
      borderRadius="8px"
      bgColor="var(--surface-surface-2)"
      overflow="hidden"
      height="fit-content"
      position="relative"
    >
      {children}
    </VStack>
  )
}
