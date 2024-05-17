import { VStack, Box, Text } from '@kuma-ui/core'
import Image from 'next/image'
import logo1 from '../../public/images/sofascore_lockup@2x.png'
import logo2 from '../../public/images/sofascore_lockup_black@2x.png'
import { useRouter } from 'next/router'
import { useThemeContext } from '@/context/ThemeContext'

export default function Footer() {
  const { isDark } = useThemeContext()

  const router = useRouter()

  const homeRoute = () => {
    router.push('/')
  }

  return (
    <>
      <VStack
        justify="center"
        w="100%"
        h="116px"
        alignItems="center"
        bgColor="var(--surface-surface-1)"
        gap="24px"
        position="absolute"
        bottom="0px"
      >
        <Box cursor="pointer" w="fit-content" h="fit-content" onClick={() => homeRoute()}>
          <Image src={isDark ? logo1 : logo2} alt="logo icon" width={132} height={20}></Image>
        </Box>
        <Text color="var(--on-surface-on-surface-lv-2)" fontSize="12px">
          © 2023 Sofascore – All Rights Reserved.
        </Text>
      </VStack>
    </>
  )
}
