import { Panel } from '@/components/Panel'
import { SettingsPanel } from '@/components/SettingsPanel'
import { useThemeContext } from '@/context/ThemeContext'
import { SportInfo } from '@/model/sports'
import Footer from '@/modules/Footer'
import { Header } from '@/modules/Header'
import { Box, Flex, VStack, Text, Input } from '@kuma-ui/core'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import bottom from '../../public/images/ic_bottom.png'
import bottomLight from '../../public/images/ic_bottomLight.png'
import top from '../../public/images/ic_top.png'
import topLight from '../../public/images/ic_topLight.png'
import gb from '../../public/images/gb.png'
import hr from '../../public/images/hr.png'
import sofaLogo from '../../public/images/sofascore_lockupBlue@2x.png'
import { useState } from 'react'
import { useWindowSizeContext } from '@/context/WindowSizeContext'

export default function Settings(props: { sports: SportInfo[] }) {
  const { isDark, setIsDark } = useThemeContext()

  const [openSelection, setOpenSelection] = useState(false)

  const { mobileWindowSize } = useWindowSizeContext()

  return (
    <>
      <Head>
        <title>Settings | Sofascore</title>
      </Head>
      {mobileWindowSize !== undefined ? (
        <Box as="main" position="relative" minHeight="100vh">
          <Header selectedSport={''} sports={props.sports} />
          {mobileWindowSize ? null : <Box h="48px" w="100%"></Box>}
          <Flex justify="center" paddingBottom="130px">
            <Panel>
              <Box p="30px 35px" fontSize="20px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
                Settings
              </Box>
              <VStack
                alignItems="center"
                justify="center"
                w="100%"
                gap="16px"
                position="relative"
                color="var(--on-surface-on-surface-lv-1)"
              >
                <SettingsPanel>
                  <Box fontSize="12px" fontWeight="bold" color="var(--color-primary-default)" p="10px 16px">
                    Language
                  </Box>
                  <Flex
                    justify="space-between"
                    alignItems="center"
                    w="100%"
                    p="10px 16px"
                    cursor="pointer"
                    _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
                    onClick={() => setOpenSelection(!openSelection)}
                    backgroundColor={`${openSelection ? 'var(--color-primary-highlight)' : null}`}
                    border={`${openSelection ? '1px solid var(--on-surface-on-surface-lv-3)' : '1px solid var(--surface-surface-2)'}`}
                    borderBottomRightRadius={`${openSelection ? '6px' : null}`}
                    borderBottomLeftRadius={`${openSelection ? '6px' : null}`}
                  >
                    <Flex alignItems="center" gap="10px">
                      <Image src={gb} alt="flag" width={25} height={25}></Image>
                      <Text p="10px 0px" fontSize="14px">
                        English
                      </Text>
                    </Flex>
                    <Image
                      src={isDark ? (openSelection ? topLight : bottomLight) : openSelection ? top : bottom}
                      alt="icon bottom"
                      width={18}
                      height={18}
                    ></Image>
                  </Flex>
                </SettingsPanel>
                {openSelection ? (
                  <VStack
                    width="90%"
                    fontSize="14px"
                    position="absolute"
                    top="100px"
                    backgroundColor="var(--form-color)"
                    zIndex="2"
                    borderRadius="8px"
                    overflow="hidden"
                    border="1px solid var(--on-surface-on-surface-lv-3)"
                  >
                    <Flex
                      cursor="pointer"
                      _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
                      alignItems="center"
                      gap="10px"
                      p="10px 16px"
                      onClick={() => setOpenSelection(!openSelection)}
                    >
                      <Image src={gb} alt="gb flag" width={25} height={25}></Image>
                      <Text p="10px 0px">English</Text>
                    </Flex>
                    <Flex
                      cursor="pointer"
                      _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
                      alignItems="center"
                      gap="10px"
                      p="10px 16px"
                      onClick={() => setOpenSelection(!openSelection)}
                    >
                      <Image src={hr} alt="hr flag" width={25} height={25}></Image>
                      <Text p="10px 0px">Hrvatski</Text>
                    </Flex>
                  </VStack>
                ) : null}
                <SettingsPanel>
                  <Box fontSize="12px" fontWeight="bold" color="var(--color-primary-default)" p="10px 16px">
                    Theme
                  </Box>
                  <form>
                    <Flex w="100%" p="10px 16px" justify="space-between">
                      <Text p="10px 0px" fontSize="14px">
                        Light
                      </Text>
                      <Input
                        type="radio"
                        width="20px"
                        accentColor="var(--color-primary-default)"
                        checked={isDark === false}
                        name="theme"
                        cursor="pointer"
                        onClick={() => setIsDark(false)}
                      ></Input>
                    </Flex>
                    <Flex w="100%" p="10px 16px" justify="space-between">
                      <Text p="10px 0px" fontSize="14px">
                        Dark
                      </Text>
                      <Input
                        type="radio"
                        width="20px"
                        accentColor="var(--color-primary-default)"
                        name="theme"
                        cursor="pointer"
                        onClick={() => setIsDark(true)}
                        checked={isDark}
                      ></Input>
                    </Flex>
                  </form>
                </SettingsPanel>
                <SettingsPanel>
                  <Box fontSize="12px" fontWeight="bold" color="var(--color-primary-default)" p="10px 16px">
                    Date Format
                  </Box>
                  <form>
                    <Flex w="100%" p="10px 16px" justify="space-between">
                      <Text p="10px 0px" fontSize="14px">
                        DD / MM / YYYY
                      </Text>
                      <Input
                        type="radio"
                        width="20px"
                        accentColor="var(--color-primary-default)"
                        checked
                        name="theme"
                        cursor="pointer"
                      ></Input>
                    </Flex>
                    <Flex w="100%" p="10px 16px" justify="space-between">
                      <Text p="10px 0px" fontSize="14px">
                        MM / DD / YYYY
                      </Text>
                      <Input
                        type="radio"
                        width="20px"
                        accentColor="var(--color-primary-default)"
                        name="theme"
                        cursor="pointer"
                      ></Input>
                    </Flex>
                  </form>
                </SettingsPanel>
                <SettingsPanel>
                  <Box p="10px 16px" fontSize="20px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
                    About
                  </Box>
                  <VStack p="10px 16px" fontSize="16px" paddingBottom="20px">
                    <Text fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
                      Sofascore Academy
                    </Text>
                    <Text fontSize="14px">Class 2024</Text>
                  </VStack>
                  <Box
                    minWidth="100%"
                    h="1px"
                    backgroundColor="var(--on-surface-on-surface-lv-4)"
                    borderRadius="2px"
                  ></Box>
                  <VStack fontSize="12px" p="10px 16px">
                    <Text color="var(--on-surface-on-surface-lv-2)" fontWeight="bold">
                      App Name
                    </Text>
                    <Text fontSize="14px">Mini Sofascore App</Text>
                  </VStack>
                  <VStack fontSize="12px" p="10px 16px">
                    <Text color="var(--on-surface-on-surface-lv-2)" fontWeight="bold">
                      API Credit
                    </Text>
                    <Text fontSize="14px">Sofascore</Text>
                  </VStack>
                  <VStack fontSize="12px" p="10px 16px" paddingBottom="20px">
                    <Text color="var(--on-surface-on-surface-lv-2)" fontWeight="bold">
                      Developer
                    </Text>
                    <Text fontSize="14px">Dominik Đurinić</Text>
                  </VStack>
                  <Box
                    minWidth="100%"
                    h="1px"
                    backgroundColor="var(--on-surface-on-surface-lv-4)"
                    borderRadius="2px"
                  ></Box>
                  <Flex justify="center" p="20px 0px">
                    <Image src={sofaLogo} alt="icon sofascore" width={132} height={20}></Image>
                  </Flex>
                </SettingsPanel>
              </VStack>
            </Panel>
          </Flex>
          <Footer />
        </Box>
      ) : null}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { res } = context
  //console.log(params?.date)

  try {
    //@ts-ignore

    const res = await fetch(`https://academy-backend.sofascore.dev/sports`)

    const detail: SportInfo[] = await res.json()

    const sports: SportInfo[] = detail

    return {
      props: { sports },
    }
  } catch (error) {
    res.statusCode = 404
    return { notFound: true }
  }
}
