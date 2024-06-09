import { Box, Flex, Link, VStack } from '@kuma-ui/core'
import Image from 'next/image'
import close from '../../../public/images/ic_close@2x.png'
import closeWhite from '../../../public/images/ic_close_white@2x.png'
import bRight from '../../../public/images/IconBlueRight@2x.png'
import bRightLight from '../../../public/images/IconBlueRightLight@2x.png'
import { EventCell } from './EventCell'
import { SportDateEvent } from '@/model/events'
import useSWR from 'swr'
import { useWidgetContext } from '@/context/OpenedWidgetContext'
import { formatName } from '@/utils/formatPathName'
import { useThemeContext } from '@/context/ThemeContext'
import { EventIncidents } from './EventIncidents'
import { useWindowSizeContext } from '@/context/WindowSizeContext'

export function EventWidget(props: {
  id: number | undefined
  detailPage: boolean
  subPanel: boolean
  selSlug: string
}) {
  const { data, isLoading } = useSWR<SportDateEvent>(`/api/event/${props.id}`)

  const { setOpenedWidget } = useWidgetContext()
  const { isDark } = useThemeContext()
  const { mobileWindowSize } = useWindowSizeContext()

  return (
    <VStack
      width={`${mobileWindowSize ? '100%' : `${props.subPanel ? '49%' : '30%'}`}`}
      borderRadius={`${mobileWindowSize ? '0px' : '16px'}`}
      bgColor="var(--surface-surface-1)"
      boxShadow={`${mobileWindowSize ? 'none' : '1px 1px rgba(0, 0, 0, 0.08)'}`}
      overflow="hidden"
      height="fit-content"
    >
      {props.detailPage ? null : (
        <Flex justify="space-between" p="20px 16px">
          <Box cursor="pointer" onClick={() => setOpenedWidget(false)}>
            <Image src={isDark ? closeWhite : close} alt="close icon" width={14} height={14}></Image>
          </Box>
          <Link
            href={`/tournament/${data?.tournament.sport.slug}/${data?.tournament.name}/${formatName(
              data?.homeTeam.name,
              data?.awayTeam.name
            )}/${data?.id}`}
          >
            <Flex alignItems="center" color="var(--color-primary-default)" fontWeight="bold">
              View Full Page <Image src={isDark ? bRightLight : bRight} alt="icon right" width={14} height={14}></Image>
            </Flex>
          </Link>
        </Flex>
      )}
      {isLoading ? (
        <Flex justify="center" alignItems="center">
          <div className="loader"></div>
        </Flex>
      ) : (
        <EventCell event={data} />
      )}
      {mobileWindowSize ? (
        <Flex
          p="5px 0px"
          w="100%"
          boxShadow="1px 1px rgba(0, 0, 0, 0.08)"
          justify="center"
          backgroundColor="var(--surface-surface-0)"
        >
          <EventIncidents eventId={props.id} selSlug={props.selSlug} />
        </Flex>
      ) : (
        <EventIncidents eventId={props.id} selSlug={props.selSlug} />
      )}
    </VStack>
  )
}
