import React from 'react'
import { ChatState } from '../Context/chatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import getSender, { getSenderFull } from '../config/ChatLogics';
import ProfileModal from './Miscellounous/ProfileModal';
import UpdateGroupChatModal from './Miscellounous/UpdateGroupChatModal';

const SingleChat = ({fetchAgain , setFetchAgain}) => {

    const {user, selectedChat, setSelectedChat} = ChatState();

  return (
    <>
      {
        Object.keys(selectedChat).length !== 0 ? (
        <>
        <Text
                fontSize={{ base: "28px", md: "30px" }}
                pb={3}
                px={2}
                w="100%"
                fontFamily="Work sans"
                display ="flex"
                justifyContent={{ base: "space-between"}}
                alignItems="center"
        >
            <IconButton
                display ={{base: "flex", md: "none"}}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat({})}
            />

            {!selectedChat.isGroupChat ? (
                
                <>
                    {getSender(user, selectedChat.users)}
                    <ProfileModal user = {getSenderFull(user, selectedChat.users)} />
                </>
            ) : (
                <>
                    {selectedChat.chatName.toUpperCase()}
                    {<UpdateGroupChatModal 
                        fetchAgain = {fetchAgain}
                        setFetchAgain = {setFetchAgain}
                    />}

                </>


            )}

        </Text>

        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDir={"column"}
          w={"100%"}
          h={"100%"}
          bg="#E8E8E8"
          borderRadius={"md"}
          overflowY="hidden"
        >

          {/* {Messagea here} */}
            
        </Box>
        </>
        ) :
        (
            // align text to center of the Box
          <Box 
                display="flex"
                justifyContent="center"
                alignItems="center"
                w="100%"
                h="100%"
                fontSize="xl"
                fontWeight="semibold"
                color="gray.500"
                bg="gray.50"
                borderRadius="md"
                boxShadow="md"
               // p={5}
                //mt={5}
          >
            <Text   alignItems={"center"}
                    justifyContent={"center"}
                    textAlign={"center"}
                    fontSize="3xl"
                    fontWeight="semibold"
                    mt={200}
            >
                Click on a user to start chatting
            </Text>
           </Box>
        
        )

      }
    </>
  )
}

export default SingleChat
