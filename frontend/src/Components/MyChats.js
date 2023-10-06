import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/chatProvider';
import { Box,  Stack, Text } from '@chakra-ui/layout';
import { Button, Grid } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/toast"
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './Miscellounous/ChatLoading';
import getSender from '../config/ChatLogics';
import GroupChatModal from './Miscellounous/GroupChatModal';

const MyChats = () => {

  const {user, chats, setChats, setSelectedChat, selectedChat} = ChatState();
  const [loggedUser, setLoggedUser] = useState();

  const toast = useToast();

  
  const fetchChats = async () => {
    
    try{
      //  console.log(user);
        const data = await fetch(`/api/chat`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        });
  
        const result = await data.json();
  
        if(result){
          console.log(result);
          setChats(result);
        }else{
          toast({
            title: "Error1",
            description: result.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
  
      }catch(err){
  //  console.log(err);
    toast({
      title: "Error",
      description: "Failed to load chats",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left"
    });
  }

}

useEffect(() => {
  setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
  fetchChats();

}, []);




  

  return (


<Box
  d={{ base: selectedChat === null ? "none" : "flex", md: "flex" }}
  flexDirection={"column"}
  alignItems={"center"}
  w={{ base: "100%", md: "31%" }}
  bg="white"
  borderRadius={"lg"}
  borderWidth={"1px"}
  p={3}
  overflow={"hidden"} // Hide the scrollbars
>
<Grid
  templateColumns="1fr auto"
  gap={3}
  pb={3}
  px={3}
  fontSize={{ base: "28px", md: "30px" }}
  fontFamily={"Work sans"}
  alignItems={"center"}
  w={"100%"}
>
  <Box>My Chats</Box>
  <GroupChatModal>
  <Button
    d="flex"
    fontSize={{ base: "17px", md: "10px", lg: "17px" }}
    rightIcon={<AddIcon />}
    >
    New Group Chat
  </Button>
    </GroupChatModal>
</Grid>

<Box
  d="flex"
  flexDirection={"column"}
  w={"100%"}
  h={"100%"}
  p={3}
  bg="#F8F8F8"
  borderRadius="lg"
  overflowY="hidden" // Apply overflowY to the outer Box
>
  {chats ? (
    <Stack
      overflowY={"auto"} // Use "auto" for automatic scrolling
      maxHeight="calc(100vh - 180px)" // Adjust the maximum height as needed
    >
      {chats.map((chat) => (
        <Box
          onClick={() => setSelectedChat(chat)}
          cursor={"pointer"}
          bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
          color={selectedChat === chat ? "white" : "black"}
          px={3}
          py={2}
          borderRadius={"lg"}
          key={chat._id}
        >
          <Text>
            {!chat.isGroupChat
              ? getSender(loggedUser, chat.users)
              : chat.chatName}
          </Text>
        </Box>
      ))}
    </Stack>
  ) : (
    <ChatLoading />
  )}
</Box>
</Box>
  )
}

export default MyChats