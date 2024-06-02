import { TeamDetails } from '@/model/team'
import { Box, Flex, Link, Text, VStack } from '@kuma-ui/core'
import Image from 'next/image'
import right from '../../../public/images/ic_pointer_right@2x.png'
import rightLight from '../../../public/images/ic_pointer_rightLight@2x.png'
import { EventCell } from '../Event/EventCell'
import useSWR from 'swr'
import { SportDateEvent } from '@/model/events'
import { formatName } from '@/utils/formatPathName'
import { useThemeContext } from '@/context/ThemeContext'

export function TeamNextMatch(props: { teamDetails: TeamDetails }) {
  const { data, error, isLoading } = useSWR<SportDateEvent[], Error>(`/api/team/${props.teamDetails.id}/events/next/0`)

  console.log(error)

  const { isDark } = useThemeContext()

  return (
    <>
      <VStack
        width="100%"
        borderRadius="16px"
        bgColor="var(--surface-surface-1)"
        boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
        p="16px 0px"
        overflow="hidden"
        height="fit-content"
      >
        <Flex w="100%" justify="center" fontSize="16px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
          Next Match
        </Flex>
        {isLoading ? (
          <Flex justify="center" alignItems="center">
            <div className="loader"></div>
          </Flex>
        ) : data !== undefined ? (
          <VStack>
            <Flex
              p="20px 16px"
              fontSize="14px"
              fontWeight="bold"
              color="var(--on-surface-on-surface-lv-1)"
              alignItems="center"
              gap="10px"
            >
              <Image
                src={`/api/tournament/${data[0]?.tournament.id}/image`}
                alt="league logo"
                width={32}
                height={32}
              ></Image>
              <Text>{data[0]?.tournament.country.name}</Text>
              <Image src={isDark ? rightLight : right} alt="icon right" width={15} height={15}></Image>
              <Text color="var(--on-surface-on-surface-lv-2)">{data[0]?.tournament.name}</Text>
            </Flex>
            <Link
              href={`${`/tournament/${data[0]?.tournament.sport.slug}/${data[0]?.tournament.name}/${formatName(data[0]?.homeTeam.name, data[0]?.awayTeam.name)}/${data[0]?.id}`}`}
            >
              <Box w="100%" _hover={{ backgroundColor: 'var(--color-primary-highlight)' }} cursor="pointer">
                <EventCell event={data[0]} matchCell={true} />
              </Box>
            </Link>
          </VStack>
        ) : null}
      </VStack>
    </>
  )
}
