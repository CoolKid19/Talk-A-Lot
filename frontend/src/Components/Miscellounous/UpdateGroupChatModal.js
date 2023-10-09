import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChatState } from '../../Context/chatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import UserListItem from '../UserAvatar/UserListItem';


const UpdateGroupChatModal = ({fetchAgain, setFetchAgain, fetchMessages}) => {
  
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [groupChatName, setGroupChatName] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();

  const {selectedChat, setSelectedChat, user} = ChatState();

  const handleRemove = async (user1) => {
    if(selectedChat.groupAdmin._id !== user._id 
        && user1._id !== user._id){
        toast({
            title: "You are not the admin",
            description: "You are not the admin",
            status: "error",
            duration: 2000,
            isClosable: true,
        })
        return;
    }


    try{

        const data = await fetch(`http://localhost:5000/api/chat/groupremove`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                chatId: selectedChat._id,
                userId: user1._id,
            })
        })

        const res = await data.json();

        if(data.ok){
            user1._id === user._id ? setSelectedChat({}) : setSelectedChat(res); // if user has left the group
            setFetchAgain(!fetchAgain);
            toast({
                title: "User removed",
                description: "User removed from group successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
            fetchMessages();
            setLoading(false);
        }

    }catch(err){
        console.log("error code 9");
        console.log(err);
        toast({
            title: "Error code 9",
            description: err.message,
            status: "error",
            duration: 2000,
            isClosable: true,
        })
    }




  }

  const handleRename = async () => {

    if(!groupChatName) return;

      try{

          setRenameLoading(true);

          const res = await fetch('http://localhost:5000/api/chat/rename', {

                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    chatId: selectedChat._id,
                    chatName: groupChatName,
                })

        })

        const data = await res.json();
        console.log(data);
        if(res.ok){
            setSelectedChat({...selectedChat, chatName: groupChatName});
            toast({
                title: "Chat renamed",
                description: "Chat renamed successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
            setRenameLoading(false);
        }

          
    }catch(err){
        toast({
            title: "Error code 7",
            description: err.message,
            status: "error",
            duration: 2000,
            isClosable: true,
        })
        setRenameLoading(false);
    }

  }

  const handleSearch = async (search) => {
    setSearch(search);
    if(!search) return;
    
    try{
        setLoading(true);

        const res = await fetch(`http://localhost:5000/api/user?search=${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        })

        const data = await res.json();
        console.log(data);
        if(res.ok){
            setSearchResults(data);
            setLoading(false);
        }



    }catch(err){
        console.log("error code 8");
        console.log(err);
        toast({
            title: "Error code 8",
            description: err.message,
            status: "error",
            duration: 2000,
            isClosable: true,
        })

        setLoading(false);
    }

  }

  const handleAddUser = async (user1) => {
        if(selectedChat.users.find((u) => u._id === user1._id)){
            toast({
                title: "User already in group",
                description: "User already in group",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
            return;
        }

        if(selectedChat.groupAdmin._id !== user._id){
            toast({
                title: "You are not the admin",
                description: "You are not the admin",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
            return;
        }

        try{

            setLoading(true);
            const data = await fetch(`http://localhost:5000/api/chat/groupadd`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    chatId: selectedChat._id,
                    userId: user1._id,
                })
            })

            const res = await data.json();

            if(data.ok){
                setSelectedChat(res);
                setFetchAgain(!fetchAgain);
                toast({
                    title: "User added",
                    description: "User added to group successfully",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
                setLoading(false);
            }
        
        }catch(err){
            console.log("error code 9");
            console.log(err);
            toast({
                title: "Error code 9",
                description: err.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }

    }

    return (
    <>
      <IconButton display={{base : "flex"}} icon = {<ViewIcon />} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader 
            display="flex"
            fontFamily={"Work sans"}
            justifyContent="center"
            alignItems="center"
          >{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Box width={"100%"}
                 display={"flex"}
                 flexWrap={"wrap"}
                 pb={3}
            >
                {selectedChat.users.map((u) => ( 
                    <UserBadgeItem
                        key = {u._id}
                        user = {u}
                        handleFunction = {()=>handleRemove(u)}
                    />
                ))}
            </Box>
            <FormControl display={"flex"}>
                <Input placeholder='Chat Name'
                       mb = {3}
                       value={groupChatName}
                       onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Button
                    variant = "solid"
                    colorScheme = "teal"
                    ml={3}
                    isLoading={renameLoading}
                    onClick={handleRename}
                >Update</Button>

            </FormControl>

            <FormControl>
                <Input placeholder='Add User to group'
                        mb = {1}
                       onChange={(e) => handleSearch(e.target.value)}
                />
            </FormControl>
            {loading ? (
                <Spinner size = "lg" />    
            ) : (
                    searchResults.map((user) => ( 
                        <UserListItem
                            key = {user._id}
                            user = {user}
                            handleFunction = {() => handleAddUser(user)}
                        />
                    ))
                
            )}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={()=>handleRemove(user)}>
              Leave Group
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateGroupChatModal
