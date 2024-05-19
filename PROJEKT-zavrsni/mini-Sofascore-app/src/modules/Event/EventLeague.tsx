import { TournamentEvent } from '@/model/events'
import { Flex, Text, VStack, Image } from '@kuma-ui/core'
import { useEffect, useState } from 'react'
//import right from '../../../public/images/ic_pointer_right@2x.png'
//import useSWR from 'swr'

export function EventLeague(props: { leagueId: number; leagueName: string; leagueCountry: string; currentDate: Date }) {
  const [preData, setPreData] = useState<TournamentEvent[]>()
  const [tournaments, setTournaments] = useState<TournamentEvent[]>()
  const [nextPrev, setNextPrev] = useState('next')
  const [page, setPage] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const [refresh2, setRefresh2] = useState(false)

  const today = new Date()

  //const { data, error } = useSWR(`/api/tournament/${props.leagueId}/events/${nextPrev}/${page}`)

  const fetchData = async () => {
    const resp = await fetch(`/api/tournament/${props.leagueId}/events/${nextPrev}/${page}`)
    const details: TournamentEvent[] = await resp.json()
    setPreData(details)
    setRefresh2(!refresh2)
  }

  useEffect(() => {
    fetchData()
  }, [refresh])

  //console.log(error)

  useEffect(() => {
    let finded = false
    switch (nextPrev) {
      case 'last':
        if (preData !== undefined) {
          for (let i = 0; i < preData?.length; i++) {
            if (checkDate(preData[i].startDate, props.currentDate) === true) {
              setTournaments([...preData])
              finded = true
              setPage(0)
              break
            }
          }
          if (finded === true) {
            break
          }
          if (new Date(preData[preData.length - 1].startDate) > props.currentDate) {
            setPage(page => page + 1)
            setRefresh(!refresh)
            break
          } else {
            setTournaments([])
            setPage(0)
          }
          /*
        if (
          preData?.find(({ startDate }) => {
            const start = new Date(startDate)
            start === props.currentDate
          }) === undefined
        ) {
          if (preData !== undefined) {
            if (new Date(preData[0].startDate) > props.currentDate) {
              setPage(page => page + 1)
              break
            } else setTournaments(data)
          }
        } else {
          console.log('finded')
          setTournaments(data)
        }
        break*/
        }
        break
      case 'next':
        if (preData !== undefined) {
          for (let i = 0; i < preData?.length; i++) {
            if (checkDate(preData[i].startDate, props.currentDate) === true) {
              setTournaments([...preData])
              finded = true
              setPage(0)
              break
            }
          }
          if (finded === true) {
            break
          }
          if (new Date(preData[preData.length - 1].startDate) < props.currentDate) {
            setPage(page => page + 1)
            setRefresh(!refresh)
            break
          } else {
            setPage(0)
            setTournaments([])
          }

          /*if (
          
          
          preData?.forEach(({startDate})=>{checkDate(startDate,props.currentDate)})
        ) {
          console.log(props.currentDate.getDate())
          console.log('didnt finded')
          if (preData !== undefined) {
            console.log(new Date(preData[5].startDate).getDate())
            if (new Date(preData[preData.length - 1].startDate) < props.currentDate) {
              setPage(page => page + 1)
              break
            } else setTournaments(data)
          }
        } else {
          console.log('finded')
          setTournaments(data)
        }*/
        }
        break
    }
  }, [refresh2])

  useEffect(() => {
    setPage(0)
    if (props.currentDate >= today) {
      setNextPrev('next') //next = today and next days
    } else {
      setNextPrev('last') //last = previous days
    }
    setRefresh(!refresh)
  }, [props.currentDate])

  const checkDate = (date1: string, date2: Date) => {
    const dateNew = new Date(date1)

    if (dateNew.getDate() === date2.getDate() && dateNew.getMonth() === date2.getMonth()) {
      return true
    } else {
      return false
    }
  }

  return (
    <VStack>
      <Flex
        p="20px 16px"
        fontSize="14px"
        fontWeight="bold"
        color="var(--on-surface-on-surface-lv-1)"
        alignItems="center"
        gap="5px"
      >
        {tournaments?.length !== 0 ? (
          <>
            <Image src={`/api/tournament/${props.leagueId}/image`} alt="league logo" width={32} height={32}></Image>
            <Text>{props.leagueCountry}</Text>
            <Text color="var(--on-surface-on-surface-lv-2)">{props.leagueName}</Text>
          </>
        ) : (
          <>
            <Image src={`/api/tournament/${props.leagueId}/image`} alt="league logo" width={32} height={32}></Image>
            <Text>{props.leagueCountry}</Text>
            <Text color="var(--on-surface-on-surface-lv-2)">{props.leagueName} - No match</Text>
          </>
        )}
      </Flex>
      {tournaments?.length !== 0 &&
        tournaments?.map(({ id, homeTeam, awayTeam, startDate }) =>
          checkDate(startDate, props.currentDate) === true ? (
            <Flex key={id} gap="10px">
              <Text>
                {new Date(startDate).toLocaleDateString('hr-HR', { day: '2-digit', month: 'numeric' }) +
                  ' ' +
                  new Date(startDate).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Text>
                {id}:{homeTeam.name}-{awayTeam.name}
              </Text>
            </Flex>
          ) : null
        )}
    </VStack>
  )
}
