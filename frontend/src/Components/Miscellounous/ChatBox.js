import React from 'react'
import { ChatState } from '../../Context/chatProvider';
import { Box } from '@chakra-ui/react';




const ChatBox = () => {

  const {user, selectedChat} = ChatState();

  console.log(selectedChat)

  return (

    <Box
    display={{ base: Object.keys(selectedChat).length === 0 ? "none" : "flex", md: "flex" }}
    alignItems="center"
    flexDir="column"
    p={3}
    w={{ base: "100%", md: "68%" }}
    bg="white"
   // boxShadow="0px 0px 5px 0px rgba(0,0,0,0.75)"
    borderRadius="lg"
    borderWidth="1px"
  >
    ChatBox
  </Box>
  )
}

export default ChatBox