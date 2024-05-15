import { Box, Button, Heading, VStack } from "@kuma-ui/core";
import logo from '../../public/images/sofascore_lockup@2x.png'
import Image from "next/image"
import { useRouter } from "next/router";

export default function Error404(){

    const router = useRouter()

    const changeRoute = ()=>{
        router.push('/')
    }

    return(
        <>
        <VStack alignItems="center" justify='center' gap='50px' p='10px' bgColor="#374df5" height='10vh'>
            <Image src={logo} alt="logo icon" width={132} height={20} ></Image>
        </VStack>
        <VStack h='90vh' alignItems="center" justify='center' gap='50px'>
            <Heading as="h1">404 - Page Not Found</Heading>
            <Button border='none' bgColor='#374df5' color='white' p='10px' _hover={{bgColor:'gray'}} onClick={changeRoute}>Go back to home page</Button>
        </VStack>
        
        </>
    )
}