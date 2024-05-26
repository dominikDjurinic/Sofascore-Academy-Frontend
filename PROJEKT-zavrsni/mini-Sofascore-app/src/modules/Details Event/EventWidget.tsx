import { Panel } from '@/components/Panel'
import { Box, Flex, Link } from '@kuma-ui/core'
import Image from 'next/image'
import close from '../../../public/images/ic_close@2x.png'
import bRight from '../../../public/images/IconBlueRight@2x.png'
import { EventCell } from './EventCell'
import { SportDateEvent } from '@/model/events'
import useSWR from 'swr'
import { useWidgetContext } from '@/context/OpenedWidgetContext'

export function EventWidget(props: { id: number | undefined; detailPage: boolean }) {
  const { data, error } = useSWR<SportDateEvent, Error>(`/api/event/${props.id}`)

  console.log(error)

  const { setOpenedWidget } = useWidgetContext()

  const formatName = (home: string | undefined, away: string | undefined) => {
    if (home !== undefined && away !== undefined) {
      const formatHome = home.toLowerCase().replace(' ', '-')
      const formatAway = away.toLowerCase().replace(' ', '-')
      const allTogether = formatHome + ' ' + formatAway
      return allTogether.replace(' ', '-')
    } else {
      return ''
    }
  }

  return (
    <Panel>
      {props.detailPage ? null : (
        <Flex justify="space-between" p="20px 16px">
          <Box cursor="pointer" onClick={() => setOpenedWidget(false)}>
            <Image src={close} alt="close icon" width={24} height={24}></Image>
          </Box>
          <Link
            href={`/tournament/${data?.tournament.sport.slug}/${data?.tournament.name}/${formatName(data?.homeTeam.name, data?.awayTeam.name)}/${data?.id}`}
          >
            <Flex alignItems="center" color="var(--color-primary-default)" fontWeight="bold">
              View Full Page <Image src={bRight} alt="icon right" width={24} height={24}></Image>
            </Flex>
          </Link>
        </Flex>
      )}
      <EventCell event={data} />
    </Panel>
  )
}
