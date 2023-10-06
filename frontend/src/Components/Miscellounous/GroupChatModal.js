import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/chatProvider';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';



const GroupChatModal = ({children}) => {


    const { user, chats, setChats} = ChatState();
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupChatName, setGroupChatName] = useState();

    const toast = useToast();

    const handleSearch = async (search) => {
        setSearch(search);
        if(!search){
            return;
        }

        try{
            
            setLoading(true);

            const data = await fetch(`/api/user?search=${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            });
            
            const result = await data.json();
            console.log(result);
            setLoading(false);
            setSearchResult(result);

        }catch(err){
            console.log("Error code 4 is going to be triggered");
            toast({
                title: "Error code 4",
                description: "Failed to search users",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });
        }

    }
    const handleSubmit = async () => {
            if(!groupChatName || !selectedUsers){
              toast({
                title: "Error",
                description: "Please fill all the fields",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
              return;
            }

            try{
              const data = await fetch(`/api/chat/group`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    chatName: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u) => u._id))
                })
            });
            
                
                const result = await data.json();
                console.log(result);
                setChats([result, ...chats]);
                onClose();
                toast({
                    title: "New Group Chat Created",
                    description: "Group Chat Created Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                  });
            }catch(err){
              console.log("Error code 5 is going to be triggered");
              console.log(err);
              toast({
                title: "Error code 5",
                description: "Failed to create Group Chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
            }
    }

    const handleDelete = async (userToDelete) => {
        setSelectedUsers(selectedUsers.filter((user) => user._id !== userToDelete._id));
    }

    const handleGroup = (userToAdd) => {
      
      if (selectedUsers.includes(userToAdd)) {
        toast({
          title: "User already added",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
  
      setSelectedUsers([...selectedUsers, userToAdd]);



    }

    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader
                fontSize={"35px"}
                fontFamily={"Work Sans"}
                d="flex"
                justifyContent={"center"}
              >
                Create Group Chat
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody
                d={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <FormControl>
                    <Input
                        placeholder='Chat Name'
                        mb={3}
                        onChange={(e) => setGroupChatName(e.target.value)}
                    />
                    
                </FormControl>

                <FormControl>
                    <Input
                        placeholder='Add Users eg: Goldilocks, Vali, Draco'
                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    
                </FormControl>

                
                <Box 
                    w="100%" 
                    d="flex" 
                    flexWrap="wrap"
                    justifyContent={"center"}
                    alignItems={"center"}
                    mb={3}    
                >
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>

                 {loading ? <div>loading</div> : (
                        searchResult?.slice(0, 4).map((user) => (
                            <UserListItem 
                                key = {user._id} 
                                user={user} 
                                handleFunction={
                                    () => handleGroup(user)
                                } 
                            />
                        ))
                )}


              </ModalBody>
    
              <ModalFooter>
                <Button onClick={handleSubmit} colorScheme="blue">
                  Create Group Chat
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal
