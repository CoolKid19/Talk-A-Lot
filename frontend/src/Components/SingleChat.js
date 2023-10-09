import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/chatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, Toast, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import getSender, { getSenderFull } from '../config/ChatLogics';
import ProfileModal from './Miscellounous/ProfileModal';
import UpdateGroupChatModal from './Miscellounous/UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat';
import './style.css'

const SingleChat = ({fetchAgain , setFetchAgain}) => {

    const {user, selectedChat, setSelectedChat} = ChatState();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    const toast = useToast();

    const fetchMessages = async () => {

      if(!selectedChat) return;

      try{
        
        const data =  await fetch(`http://localhost:5000/api/messages/${selectedChat._id}`, {
        method: 'GET',  
        headers: {
            contentType: 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        });

        const res = await data.json();
        console.log(messages);
        setMessages(res);
        setLoading(false);

      }catch(err) {

        console.log(err);
        console.log("error code 78 proble in fetching messages")

        toast({
          title: "An error occurred.",
          description: "Unable to fetch messages.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })

      }

    }

    useEffect(() => {
      fetchMessages();
    }, [selectedChat]);

    const sendMessage = async (e) => {
        if(e.key === 'Enter' && newMessage !== '') {
            // send the message
            
            try{
              
              setNewMessage('');
              const data = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                  content: newMessage,
                  chatId: selectedChat._id,
                })
              });

              const res = await data.json();
              setMessages([...messages, res]);

              console.log(res);

            }catch(err) {
                console.log(err);
                console.log('messsage api error code 77');

                toast({
                  title: "An error occurred.",
                  description: "Unable to send message.",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                })

            }


        }
    }

    const typingHandler = (e) => {
      setNewMessage(e.target.value);
      // typing Indicator logic
    }

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
                        fetchMessages = {fetchMessages}
                    />}

                </>


            )}

        </Text>

        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          flexDirection={"column"}
          p={3}
          w={"100%"}
          h={"100%"}
          bg="#E8E8E8"
          borderRadius={"md"}
          overflowY="hidden"
        >

          {loading ? (
            <Spinner
              h={20}
              w={20}
              alignSelf="center"
              size="xl"
              margin={"auto"}
            />
          ) : (
             <div className='messages'>
              <ScrollableChat messages={messages}  />
              </div>
          )}

          <FormControl onKeyDown={sendMessage} isRequired mt={3}>
            <Input 
              variant="filled"
              bg = "#E0E0E0"
              placeholder='Enter a message'
              onChange={typingHandler}
              value={newMessage}
            />

            
          </FormControl>
            
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
