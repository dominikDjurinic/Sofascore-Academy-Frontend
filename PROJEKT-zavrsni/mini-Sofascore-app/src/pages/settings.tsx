import { useThemeContext } from '@/context/ThemeContext'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { Box, Button, Flex, VStack, Text } from '@kuma-ui/core'

export default function Settings() {
  const { isDark, setIsDark } = useThemeContext()
  return (
    <>
      <Header selectedSport={null} sports={null} homePage={false} />
      <Box h="48px" w="100%"></Box>
      <Flex justifyContent="center">
        <VStack
          width="30%"
          borderRadius="16px"
          bgColor="var(--surface-surface-1)"
          boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
          p="16px 0px"
          gap="16px"
          alignItems="center"
        >
          <Box p="10px 16px" fontSize="20px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
            Theme
          </Box>
          <Text color="var(--on-surface-on-surface-lv-1)">Current theme: {isDark ? 'dark' : 'light'}</Text>
          <Button
            w="fit-content"
            bgColor="var(--color-primary-variant)"
            color="var(--surface-surface-1)"
            onClick={() => setIsDark(false)}
          >
            Light Theme
          </Button>
          <Button
            w="fit-content"
            bgColor="var(--color-primary-variant)"
            color="var(--surface-surface-1)"
            onClick={() => setIsDark(true)}
          >
            Dark Theme
          </Button>
        </VStack>
      </Flex>

      <Footer />
    </>
  )
}
