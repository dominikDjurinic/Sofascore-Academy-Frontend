//import { useDateFormatContext } from '@/context/DateFormatContext'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { useWindowSizeContext } from '@/context/WindowSizeContext'
import { SportDateEvent } from '@/model/events'
import { formatName } from '@/utils/formatPathName'
import { Box, Flex, Link, Text, VStack } from '@kuma-ui/core'
import Image from 'next/image'
import right from '../../../public/images/ic_pointer_right@2x.png'
import rightLight from '../../../public/images/ic_pointer_rightLight@2x.png'
import useSWR from 'swr'
import { useThemeContext } from '@/context/ThemeContext'
import { useEffect, useState } from 'react'
import { FavouriteEvent } from '@/model/favorites'
import { settingFavourites } from '@/utils/settingFavourites'
import { LinkingDetails } from '@/model/linking'

export function EventCell(props: {
  eventId: number
  // eslint-disable-next-line no-unused-vars
  openWidget: (data: boolean) => void
  // eslint-disable-next-line no-unused-vars
  openId: (id: number) => void
  // eslint-disable-next-line no-unused-vars
  selectedId: (id: number) => void
  clickedCell: number
  setLinkData: (data: LinkingDetails[]) => void
}) {
  const { data, error } = useSWR<SportDateEvent, Error>(`/api/event/${props.eventId}`)

  console.log(error)

  const { mobileWindowSize } = useWindowSizeContext()
  const { openedWidget } = useWidgetContext()
  const { isDark } = useThemeContext()

  const setEventStatus = (eventStatus: string | undefined) => {
    if (eventStatus === 'inprogress') {
      return 'Live'
    } else if (eventStatus === 'finished') {
      return 'FT'
    } else {
      return '-'
    }
  }

  //const { engDate } = useDateFormatContext()

  return (
    <Link
      href={`${`/tournament/${data?.tournament.sport.slug}/${data?.tournament.name}/${formatName(
        data?.homeTeam.name,
        data?.awayTeam.name
      )}/${data?.id}`}`}
      onClick={(e: { preventDefault: () => void }) => {
        if (!mobileWindowSize) {
          e.preventDefault()
        }
      }}
      w="90%"
    >
      <Box
        w="100%"
        cursor="pointer"
        onClick={() => {
          props.openWidget(true)
          data !== undefined ? props.openId(data?.id) : null
          data !== undefined ? props.selectedId(data?.id) : null
          props.setLinkData([
            {
              name: `${data?.tournament.sport.name}`,
              urlLink: `/${data?.tournament.sport.slug !== 'football' ? `${data?.tournament.sport.slug}` : ''}`,
            },
            {
              name: `${data?.tournament.name}`,
              urlLink: `/tournament/${data?.tournament.sport.slug}/${data?.tournament.name}`,
            },
            {
              name: `${data?.homeTeam.name} vs ${data?.awayTeam.name}`,
              urlLink: `/tournament/${data?.tournament.sport.slug}/${data?.tournament.name}/${formatName(
                data?.homeTeam.name,
                data?.awayTeam.name
              )}/${data?.id}`,
            },
          ])
        }}
      >
        <Flex alignItems="center" gap="3px" h="fit-content" fontSize="14px" w="100%">
          <VStack
            justify="center"
            alignItems="center"
            w="80px"
            padding="10px 10px"
            color="var(--on-surface-on-surface-lv-2)"
          >
            {data !== undefined ? (
              <Text textAlign="center">
                {new Date(data?.startDate).toLocaleTimeString('hr-HR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            ) : null}

            <Text color={`${data?.status === 'inprogress' ? 'var(--specific-live)' : null}`}>
              {setEventStatus(data?.status)}
            </Text>
          </VStack>
          <Box minWidth="1px" h="40px" backgroundColor="var(--on-surface-on-surface-lv-4)" borderRadius="2px"></Box>
          <Flex width="100%" justify="space-between" padding="10px">
            <VStack justify="center">
              <Flex gap="8px" alignItems="center" p="5px 0px">
                <Image
                  src={`https://academy-backend.sofascore.dev/team/${data?.homeTeam.id}/image`}
                  alt="league logo"
                  width={16}
                  height={16}
                  priority
                ></Image>
                <Text
                  color={`${
                    data?.winnerCode === 'away' || data?.winnerCode === 'draw'
                      ? 'var(--on-surface-on-surface-lv-2)'
                      : 'var(--on-surface-on-surface-lv-1)'
                  }`}
                >
                  {data?.homeTeam.name}
                </Text>
              </Flex>
              <Flex gap="8px" alignItems="center" p="5px 0px">
                <Image
                  src={`https://academy-backend.sofascore.dev/team/${data?.awayTeam.id}/image`}
                  alt="league logo"
                  width={16}
                  height={16}
                  priority
                ></Image>
                <Text
                  color={`${
                    data?.winnerCode === 'home' || data?.winnerCode === 'draw'
                      ? 'var(--on-surface-on-surface-lv-2)'
                      : 'var(--on-surface-on-surface-lv-1)'
                  }`}
                >
                  {data?.awayTeam.name}
                </Text>
              </Flex>
            </VStack>
            <VStack justify="center" w="50px" alignItems="center">
              <Text
                color={`${
                  data?.winnerCode === 'away' || data?.winnerCode === 'draw'
                    ? 'var(--on-surface-on-surface-lv-2)'
                    : data?.status === 'inprogress'
                    ? 'var(--specific-live)'
                    : 'var(--on-surface-on-surface-lv-1)'
                }`}
                p="5px 0px"
              >
                {data?.homeScore.total}
              </Text>
              <Text
                color={`${
                  data?.winnerCode === 'home' || data?.winnerCode === 'draw'
                    ? 'var(--on-surface-on-surface-lv-2)'
                    : data?.status === 'inprogress'
                    ? 'var(--specific-live)'
                    : 'var(--on-surface-on-surface-lv-1)'
                }`}
                p="5px 0px"
              >
                {data?.awayScore.total}
              </Text>
            </VStack>
          </Flex>
        </Flex>
      </Box>
    </Link>
  )
}
