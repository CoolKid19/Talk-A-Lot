import React from 'react'
import { ChatState } from '../../Context/chatProvider';
import { Box } from '@chakra-ui/react';
import SingleChat from '../SingleChat';




const ChatBox = ({fetchAgain, setFetchAgain}) => {
  console.log("chatbox")
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
    <SingleChat fetchAgain = {fetchAgain} setFetchAgain = {setFetchAgain} />
  </Box>
  )
}

export default ChatBox