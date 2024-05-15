import { SportInfo } from "@/model/sports"
import { Box, Flex, VStack, Text} from "@kuma-ui/core"
import logo from '../../public/images/sofascore_lockup@2x.png'
import settings from '../../public/images/ic_settings@2x.png'
import Image from "next/image"
import { useRouter } from "next/router"

export function Header(props:{selectedSport:string, sports:SportInfo[]}){
    const router = useRouter()

    const nameReplace = (name:string) => {
        return name.replace('-','_');
    }

    const changeRoute = (slug:string) => {
        if(slug!='football')
            router.push(`/${slug}`)
        else
            router.push('/')
    }
    
    const homeRoute = () => {
        router.push('/')
    }

    const sportsIcons = [{
        name:'football',
        image:'/images/football.png'
    },{
        name:'basketball',
        image:'/images/basketball.png'
    },{
        name:'american-football',
        image:'/images/american-football.png'
    },]

    return(
        <VStack alignItems={"center"} bgColor={"#374df5"} position='sticky' top='0px'>
            <Flex justify='center' w='100%' h='64px' alignItems='center' position='relative'>
                <Box cursor='pointer' w='fit-content' h='fit-content' onClick={()=>homeRoute()}>
                    <Image src={logo} alt="logo icon" width={132} height={20} ></Image>
                </Box>
                <Box position='absolute' right='20px' cursor='pointer'>
                    <Image src={settings} alt="icon settings" width={24} height={24}></Image>
                </Box>
            </Flex>
            <Flex justify={"center"} alignItems={"center"} h='64px'>
                {props.sports.map(({name,slug,id})=> props.selectedSport===name? <Flex key={name} cursor='pointer'  h='100%' color='white' w='fit-content' p='16px 8px' justify='center' alignItems='center' gap='4px' borderBottom='4px solid white' onClick={()=>changeRoute(slug)}><Image src={sportsIcons[id-1].image} alt="logo Sport" width={16} height={16}></Image><Text>{name}</Text></Flex>:
                <Flex key={name} cursor='pointer' color={"white"} h='100%' w='fit-content' p='16px 8px' justify='center' alignItems='center' gap='4px' borderBottom='4px solid #374df5' onClick={()=>changeRoute(slug)}><Image src={sportsIcons[id-1].image} alt="logo Sport" width={16} height={16}></Image><Text>{name}</Text></Flex>)}
            </Flex>
        </VStack>
    )
    
}
