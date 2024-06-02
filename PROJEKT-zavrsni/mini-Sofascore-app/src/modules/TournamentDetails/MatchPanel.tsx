import { useThemeContext } from '@/context/ThemeContext'
import { Flex, VStack, Text, Box, Link } from '@kuma-ui/core'
import Image from 'next/image'
import left from '../../../public/images/ic_left.png'
import leftLight from '../../../public/images/ic_leftLight.png'
import right from '../../../public/images/IconBlueRight@2x.png'
import rightLight from '../../../public/images/IconBlueRightLight@2x.png'
import useSWR from 'swr'
import { useState } from 'react'
import { EventCell } from '../Event/EventCell'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { formatName } from '@/utils/formatPathName'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { SportDateEvent } from '@/model/events'

export function MatchPanel(props: {
  tournamentId?: number
  // eslint-disable-next-line no-unused-vars
  eventId: (id: number) => void
  apiFor: string
  teamId?: number
  playerId?: number
}) {
  const { isDark } = useThemeContext()
  const { openedWidget, setOpenedWidget } = useWidgetContext()
  const { mobileWindowSize } = useWindowSizeContext()

  const [span, setSpan] = useState('next')
  const [page, setPage] = useState(0)
  const [prevSpan, setPrevSpan] = useState('next')
  const [prevPage, setPrevPage] = useState(0)
  const [clickedCell, setClickedCell] = useState<number | undefined>(undefined)

  const apiRoute = () => {
    switch (props.apiFor) {
      case 'tournament':
        return `/api/tournament/${props.tournamentId}/events/${span}/${page}`
      case 'team':
        return `/api/team/${props.teamId}/events/${span}/${page}`
      case 'player':
        return `/api/player/${props.playerId}/events/${span}/${page}`
    }
  }

  const { data, error, isLoading } = useSWR<SportDateEvent[], Error>(apiRoute())
  console.log(error)

  const nextMatchesPage = (nextLast: string) => {
    let newPage: number
    if (nextLast === 'next') {
      if (prevSpan === 'last') {
        if (prevPage === 0) {
          setPrevSpan('next')
          setSpan('next')
        } else {
          newPage = prevPage + 1
          setPrevPage(newPage)
          setPage(Math.abs(newPage))
        }
      } else {
        newPage = prevPage + 1
        setPrevPage(newPage)
        setPage(newPage)
      }
    } else {
      if (prevSpan === 'next') {
        if (prevPage === 0) {
          setPrevSpan('last')
          setSpan('last')
        } else {
          newPage = prevPage - 1
          setPrevPage(newPage)
          setPage(newPage)
        }
      } else {
        newPage = prevPage - 1
        setPrevPage(newPage)
        setPage(Math.abs(newPage))
      }
    }
  }

  let round = 0
  const settingRound = (newRound: number) => {
    round = newRound
    return newRound
  }

  return (
    <VStack
      width="49%"
      borderRadius="16px"
      bgColor="var(--surface-surface-1)"
      boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
      paddingBottom="16px"
      overflow="hidden"
      height="fit-content"
    >
      <Flex justify="space-between" alignItems="center" p="10px 10px">
        <Flex
          m="8px"
          cursor="pointer"
          p="10px 16px"
          bgColor="var(--surface-surface-1)"
          justifyContent="center"
          alignItems="center"
          border="solid 2px var(--color-primary-default)"
          borderRadius="2px"
          onClick={() => nextMatchesPage('last')}
        >
          <Image src={isDark ? leftLight : left} alt="iconLeft" width={14} height={14} priority></Image>
        </Flex>
        <Text color="var(--on-surface-on-surface-lv-1)" fontSize="16px" fontWeight="bold">
          Matches
        </Text>
        <Flex
          m="8px"
          cursor="pointer"
          p="10px 16px"
          bgColor="var(--surface-surface-1)"
          justifyContent="center"
          alignItems="center"
          border="solid 2px var(--color-primary-default)"
          borderRadius="2px"
          onClick={() => nextMatchesPage('next')}
        >
          <Image src={isDark ? rightLight : right} alt="iconRight" width={14} height={14} priority></Image>
        </Flex>
      </Flex>

      {isLoading ? (
        <Flex justify="center" alignItems="center">
          <div className="loader"></div>
        </Flex>
      ) : (
        data?.map(data => (
          <Box key={data.id}>
            {data.round !== round ? (
              <Text fontSize="12px" fontWeight="bold" p="10px 10px" color="var(--on-surface-on-surface-lv-1)">
                Round {settingRound(data.round)}
              </Text>
            ) : null}

            <Link
              href={`${`/tournament/${data.tournament.sport.slug}/${data.tournament.name}/${formatName(data.homeTeam.name, data.awayTeam.name)}/${data.id}`}`}
              onClick={(e: { preventDefault: () => void }) => {
                if (!mobileWindowSize) {
                  e.preventDefault()
                }
              }}
            >
              <Box
                w="100%"
                _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
                cursor="pointer"
                onClick={() => {
                  props.eventId(data.id)
                  setOpenedWidget(true)
                  setClickedCell(data.id)
                }}
                backgroundColor={`${clickedCell === data.id && openedWidget ? 'var(--color-primary-highlight)' : 'var(--surface-surface-1)'}`}
              >
                <EventCell event={data} matchCell={true} />
              </Box>
            </Link>
          </Box>
        ))
      )}
    </VStack>
  )
}
