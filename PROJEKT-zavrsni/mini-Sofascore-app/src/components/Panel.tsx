import { VStack } from '@kuma-ui/core'
import { PropsWithChildren } from 'react'

export function Panel({ children }: PropsWithChildren) {
  return (
    <VStack
      minWidth="30%"
      borderRadius="16px"
      bgColor="var(--surface-surface-1)"
      boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
      paddingBottom="16px"
      overflow="hidden"
    >
      {children}
    </VStack>
  )
}
