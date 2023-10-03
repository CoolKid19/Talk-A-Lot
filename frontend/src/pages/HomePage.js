import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import Login from '../Components/Authentication/Login';
import Signup from '../Components/Authentication/Signup';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {

    const history = useHistory();

    useEffect(() => {

        const user = localStorage.getItem('userInfo');
        console.log("Dsf");

        if(user) {

            history.push('/chats');

        }

    }, [history]);

    return (
        <Container maxW = 'xl' centerContent>
            <Box
                display = 'flex'
                justifyContent = 'center'
                padding = {3}
                w = '100%'
                margin = "40px 0 15px 0"
                bg = 'white'
                borderRadius = "lg"
                borderWidth = "1px"
            >
                <Text fontSize="4xl" fontFamily = "Work Sans" color = "black" m = "0 0 0 150px">Talk-A-Lot</Text>
            </Box>
            <Box bg = 'white' w = '100%' p = {4} borderRadius="lg" color = "black" borderWidth="1px">
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList mb = "1em">
                    <Tab width = "50%">Login</Tab>
                    <Tab width="50%">Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <Signup />
                    </TabPanel>
                </TabPanels>
                </Tabs>               
            </Box>
            
        </Container>
    )
}