import { VStack, Box, Text, Link } from '@kuma-ui/core'
import Image from 'next/image'
import logo1 from '../../public/images/sofascore_lockup@2x.png'
import logo2 from '../../public/images/sofascore_lockup_black@2x.png'
import { useThemeContext } from '@/context/ThemeContext'

export default function Footer() {
  const { isDark } = useThemeContext()

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
        marginTop="20px"
      >
        <Link href={'/'}>
          <Box cursor="pointer" w="fit-content" h="fit-content">
            <Image src={isDark ? logo1 : logo2} alt="logo icon" width={132} height={20}></Image>
          </Box>
        </Link>
        <Text color="var(--on-surface-on-surface-lv-2)" fontSize="12px">
          © 2024 Sofascore – All Rights Reserved.
        </Text>
      </VStack>
    </>
  )
}
