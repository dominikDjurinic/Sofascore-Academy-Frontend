import { Panel } from '@/components/Panel'
import { Box, Button, Flex, Link, Text } from '@kuma-ui/core'
import Image from 'next/image'
import ad from '../../public/images/advertisement1.png'

export function Advertisement() {
  return (
    <>
      <Panel>
        <Box>
          <Text p="10px 10px" fontSize="12px" color="var(--on-surface-on-surface-lv-2)">
            ADVERTISEMENT
          </Text>
          <Flex justify="center" p="20px 0px" position="relative">
            <Image src={ad} alt="advertisement" className="adImage" width={500} height={300}></Image>
            <Link
              position="absolute"
              bottom="25px"
              right="30%"
              href="https://corporate.sofascore.com/hr/sofascore-academy"
            >
              <Button
                borderRadius="2px"
                backgroundColor="var(--surface-surface-1)"
                color="var(--on-surface-on-surface-lv-2)"
                border="none"
              >
                Learn more
              </Button>
            </Link>
          </Flex>
        </Box>
      </Panel>
    </>
  )
}
