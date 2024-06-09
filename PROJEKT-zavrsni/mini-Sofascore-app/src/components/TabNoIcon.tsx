import { useTabContext } from '@/context/OpenedTab'
import { Box, Flex, Text, VStack } from '@kuma-ui/core'

// eslint-disable-next-line no-unused-vars
export function TabNoIcon(props: { name: string }) {
  const { openedTab, setOpenedTab } = useTabContext()

  return (
    <VStack>
      <Flex
        cursor="pointer"
        h="100%"
        w="fit-content"
        padding="16px 10px"
        justify="center"
        alignItems="center"
        gap="4px"
        onClick={() => {
          setOpenedTab(props.name)
          //changeRoute(props.slug)
        }}
      >
        <Text
          fontSize="14px"
          color={`${
            openedTab !== null && openedTab === props.name
              ? 'var(--color-primary-default)'
              : 'var(--on-surface-on-surface-lv-2)'
          }`}
        >
          {props.name}
        </Text>
      </Flex>
      {openedTab !== null && openedTab === props.name ? (
        <Box minWidth="100%" h="4px" backgroundColor="var(--color-primary-default)" borderRadius="2px"></Box>
      ) : (
        <Box
          minWidth="100%"
          h="4px"
          backgroundColor="var(--surface-surface-1)"
          borderRadius="2px"
          visibility="hidden"
        ></Box>
      )}
    </VStack>
  )
}
