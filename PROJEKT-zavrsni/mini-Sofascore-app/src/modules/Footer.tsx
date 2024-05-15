import { VStack, Box, Text} from "@kuma-ui/core";
import Image from "next/image"
import logo from '../../public/images/sofascore_lockup_black@2x.png'
import { useRouter } from "next/router";

export default function Footer(){

    const router = useRouter()

    const homeRoute = () => {
        router.push('/')
    }


    return(
        <>
            <VStack justify='center' w='100%' h='116px' alignItems='center' bgColor='white' gap='24px'>
                <Box cursor='pointer' w='fit-content' h='fit-content' onClick={() => homeRoute()}>
                    <Image src={logo} alt="logo icon" width={132} height={20} ></Image>
                </Box>
                <Text color='gray' fontSize='12px'>© 2023 Sofascore – All Rights Reserved.</Text>
            </VStack>
        </>
    )
}