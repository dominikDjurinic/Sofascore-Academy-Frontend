import { useThemeContext } from '@/context/ThemeContext'
import { SportInfo } from '@/model/sports'
import { Header } from '@/modules/Header'
import { capitalize } from '@/utils/capitalizeWord'
import { useIsServer } from '@/utils/useIsServer'
import { Box, Button } from '@kuma-ui/core'
import { error } from 'console'
import { GetServerSideProps } from 'next'
import { redirect } from 'next/navigation'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Footer from '@/modules/Footer'

export default function Sports(props:{selectedSport:string, sports:SportInfo[]}) {
  const { setIsDark } = useThemeContext()

  return (
    <>
      <Head>
        <title>Sofascore - {props.selectedSport}</title>
      </Head>
      <Box as='main'>
        <Header selectedSport={props.selectedSport} sports={props.sports}/>
        <Box as='h1' color='colors.primary'>
        </Box>
        <Button onClick={() => setIsDark((v) => !v)}>Toggle theme</Button>
        <Footer/>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, res } = context
  
    //@ts-ignore
    const { sportName } = params

    if(sportName==='football'){
        redirect('/')
    }

    const resp = await fetch(`https://academy-backend.sofascore.dev/sports`)

    if(resp.status===404){
        return {notFound:true}
    }

    const details:SportInfo[] = await resp.json()

    if(details.find(({slug})=>slug===sportName)===undefined){
        return {notFound:true}
    }

    let selectedSport = details.find(({slug})=>slug===sportName)?.name

    const sports:SportInfo[] = details

    return {
        props: {selectedSport, sports}
    }
      
  }
