import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { VStack } from '@kuma-ui/core'
import { PropsWithChildren } from 'react'

export function Panel({ children }: PropsWithChildren) {
  const { mobileWindowSize } = useWindowSizeContext()

  return (
    <VStack
      width={`${mobileWindowSize ? '100%' : '30%'}`}
      borderRadius={`${mobileWindowSize ? '0px' : '16px'}`}
      bgColor="var(--surface-surface-1)"
      boxShadow={`${mobileWindowSize ? 'none' : '1px 1px rgba(0, 0, 0, 0.08)'}`}
      paddingBottom={`${mobileWindowSize ? '0px' : '16px'}`}
      overflow="hidden"
      height="fit-content"
    >
      {children}
    </VStack>
  )
}
