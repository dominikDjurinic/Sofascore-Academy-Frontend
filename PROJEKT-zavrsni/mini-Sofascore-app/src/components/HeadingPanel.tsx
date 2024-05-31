import { Box, Flex, VStack, Text } from '@kuma-ui/core'
import Image from 'next/image'
import { TabNoIcon } from './TabNoIcon'
import { useState } from 'react'
import countries from '../../public/countries.json'

export function HeadingPanel(props: { name: string; country: string; imageLogo: string; tabs: string[] }) {
  const [selectedName, setSelectedName] = useState(props.tabs[0])

  const alpha2Country = (country: string) => {
    const alpha2 = countries.find(({ name }) => name === country)

    return alpha2?.code.toLowerCase()
  }

  return (
    <VStack
      width="60%"
      borderRadius="16px"
      bgColor="var(--surface-surface-1)"
      boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
      overflow="hidden"
      height="fit-content"
      p="0px 16px"
    >
      <Flex p="20px 0px" alignItems="center" gap="24px">
        <Flex
          border="1px solid var(--on-surface-on-surface-lv-3)"
          borderRadius="4px"
          w="80px"
          h="80px"
          justify="center"
          alignItems="center"
        >
          <Image src={props.imageLogo} alt="logo" width={70} height={70}></Image>
        </Flex>
        <VStack>
          <Box fontSize="32px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
            {props.name}
          </Box>
          <Flex alignItems="center" gap="4px">
            <Image
              src={`https://www.sofascore.com/static/images/flags/${alpha2Country(props.country)}.png`}
              alt="logo"
              width={16}
              height={16}
            ></Image>
            <Text>{props.country}</Text>
          </Flex>
        </VStack>
      </Flex>
      <Flex>
        {props.tabs.map(name => (
          <TabNoIcon
            name={name}
            selectedName={selectedName}
            setSelectName={(data: string) => setSelectedName(data)}
            key={name}
          />
        ))}
      </Flex>
    </VStack>
  )
}
