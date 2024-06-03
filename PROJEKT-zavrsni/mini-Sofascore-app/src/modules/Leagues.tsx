import { Box, Text, Flex, Image, Link } from '@kuma-ui/core'
import { Leagues } from '@/model/sports'
import { Panel } from '@/components/Panel'
import { useWidgetContext } from '@/context/OpenedWidgetContext'

export function LeaguesPanel(props: { leagues: Leagues[]; selLeagueId: number | undefined }) {
  const { setOpenedWidget } = useWidgetContext()
  return (
    <Panel>
      <Box p="20px 16px" fontSize="20px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
        Leagues
      </Box>
      {props.leagues.map(({ name, id, sport }) => (
        <Link key={id} href={`/tournament/${sport.slug}/${name}`}>
          <Flex
            alignItems="center"
            p="8px 16px"
            gap="16px"
            _hover={{ backgroundColor: 'var(--color-primary-highlight)' }}
            cursor="pointer"
            onClick={() => {
              setOpenedWidget(false)
            }}
            backgroundColor={`${props.selLeagueId !== undefined && props.selLeagueId === id ? 'var(--color-primary-highlight)' : 'var(--surface-surface-1)'}`}
          >
            <Image
              src={`https://academy-backend.sofascore.dev/tournament/${id}/image`}
              alt="league logo"
              width={40}
              height={40}
            ></Image>
            <Text fontSize="14px" fontWeight="bold" color="var(--on-surface-on-surface-lv-1)">
              {name}
            </Text>
          </Flex>
        </Link>
      ))}
    </Panel>
  )
}
