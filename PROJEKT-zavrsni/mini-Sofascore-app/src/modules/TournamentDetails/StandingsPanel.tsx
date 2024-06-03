import { TournamentDetails, TournamentStandings } from '@/model/tournaments'
import { Box, Flex, Text, VStack } from '@kuma-ui/core'
import useSWR from 'swr'
import { StandingCell } from './StandingCell'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import bottom from '../../../public/images/ic_bottom.png'
import bottomLight from '../../../public/images/ic_bottomLight.png'
import top from '../../../public/images/ic_top.png'
import topLight from '../../../public/images/ic_topLight.png'
import { useThemeContext } from '@/context/ThemeContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'

export function StandingsPanel(props: {
  tournamentId?: number
  selSlug: string
  teamId?: number
  // eslint-disable-next-line no-unused-vars
  selTournament?: (id: number) => void
  tournaments?: TournamentDetails[]
}) {
  const { data, error, isLoading } = useSWR<TournamentStandings[], Error>(
    `/api/tournament/${props.tournamentId}/standings`
  )
  console.log(error)

  const [openSelection, setOpenSelection] = useState(false)
  const { isDark } = useThemeContext()
  const { mobileWindowSize } = useWindowSizeContext()

  return (
    <>
      <VStack
        width="100%"
        borderRadius={`${mobileWindowSize ? '0px' : '16px'}`}
        bgColor="var(--surface-surface-1)"
        boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
        paddingBottom="16px"
        overflow="hidden"
        height="fit-content"
      >
        <Flex w="100%" justify="center">
          {props.teamId !== undefined ? (
            <Flex w="98%" borderRadius="8px" backgroundColor="var(--surface-surface-2)" m="5px 0px" position="relative">
              <Flex w="200px" fontSize="12px" boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)" borderRadius="6px" m="10px">
                <Flex
                  justify="space-between"
                  alignItems="center"
                  w="100%"
                  p="0px 3px"
                  cursor="pointer"
                  _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
                  onClick={() => setOpenSelection(!openSelection)}
                  backgroundColor={`${openSelection ? 'var(--color-primary-highlight)' : 'var(--surface-surface-1)'}`}
                  border={`${openSelection ? '1px solid var(--on-surface-on-surface-lv-3)' : '1px solid var(--surface-surface-2)'}`}
                  borderRadius="6px"
                >
                  <Flex
                    cursor="pointer"
                    alignItems="center"
                    gap="10px"
                    p="5px 5px"
                    onClick={() => setOpenSelection(!openSelection)}
                  >
                    <Image
                      src={`https://academy-backend.sofascore.dev/tournament/${props.tournaments?.find(({ id }) => id === props.tournamentId)?.id}/image`}
                      alt="tournament logo"
                      width={20}
                      height={20}
                    ></Image>
                    <Text p="10px 0px">{props.tournaments?.find(({ id }) => id === props.tournamentId)?.name}</Text>
                  </Flex>
                  <Image
                    src={isDark ? (openSelection ? topLight : bottomLight) : openSelection ? top : bottom}
                    alt="icon bottom"
                    width={18}
                    height={18}
                  ></Image>
                </Flex>
              </Flex>
              {openSelection ? (
                <VStack
                  w="200px"
                  fontSize="12px"
                  position="absolute"
                  top="60px"
                  left="10px"
                  backgroundColor="var(--surface-surface-1)"
                  zIndex="2"
                  borderRadius="8px"
                  overflow="hidden"
                  border="1px solid var(--on-surface-on-surface-lv-3)"
                >
                  {props.tournaments?.map(({ id, name }) => (
                    <Flex
                      key={id}
                      cursor="pointer"
                      _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
                      alignItems="center"
                      gap="10px"
                      p="5px 8px"
                      onClick={() => {
                        setOpenSelection(!openSelection)
                        if (props.selTournament !== undefined) props.selTournament(id)
                      }}
                    >
                      <Image
                        src={`https://academy-backend.sofascore.dev/tournament/${id}/image`}
                        alt="tournament logo"
                        width={20}
                        height={20}
                      ></Image>
                      <Text p="10px 0px">{name}</Text>
                    </Flex>
                  ))}
                </VStack>
              ) : null}
            </Flex>
          ) : null}
        </Flex>

        <Flex w="100%" gap="20px" p="16px" color="var(--on-surface-on-surface-lv-2)">
          <Flex w="50%" gap="4px">
            <Flex w="5%" justify="center">
              #
            </Flex>
            <Box w="40%">Team</Box>
          </Flex>
          <Flex w="50%" justify="space-between">
            <Flex w="5%" justify="center">
              P
            </Flex>
            <Flex w="5%" justify="center">
              W
            </Flex>
            <Flex w="5%" justify="center">
              D
            </Flex>
            <Flex w="5%" justify="center">
              L
            </Flex>
            <Flex w="20%" justify="center">
              Goals
            </Flex>
            <Flex w="5%" justify="center">
              PTS
            </Flex>
          </Flex>
        </Flex>
        {isLoading ? (
          <Flex justify="center" alignItems="center">
            <div className="loader"></div>
          </Flex>
        ) : data !== undefined ? (
          data[data.findIndex(({ type }) => type === 'total')]?.sortedStandingsRows.map((standing, index) => (
            <Link key={standing.id} href={`/team/${props.selSlug}/${standing.team.name}/${standing.team.id}`}>
              <Box
                w="100%"
                _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
                cursor="pointer"
                backgroundColor={`${props.teamId !== undefined && standing.team.id === props.teamId ? 'var(--color-primary-highlight)' : null} `}
              >
                <StandingCell data={standing} place={index + 1} />
              </Box>
            </Link>
          ))
        ) : null}
      </VStack>
    </>
  )
}
