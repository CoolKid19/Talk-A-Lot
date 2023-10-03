import { Tooltip, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, useDisclosure, Input, useToast, Spinner } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { ChatState } from '../../Context/chatProvider';
import React from 'react'
import {useState} from 'react';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import ChatLoading from './ChatLoading';

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

import UserListItem from '../UserAvatar/UserListItem';

const SideDrawer = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const {user, setSelectedChat, chats, setChats} = ChatState();

    const history = useHistory();

    const toast = useToast();

    const logoutHandler = () => {
        console.log('logout');
        localStorage.removeItem('userInfo');
        history.push('/');
    }

    const accessChat = async (userId) => {

        try{
            setLoadingChat(true);

            const data = await fetch(`/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({userId})   //JSON.stringify({userId})
            });
            const result = await data.json();
           // console.log(result);
            if(!chats.find((chat) => chat._id === result._id)){ //searching for chat with requested user in all the chats of the logged in user
                setChats([...chats, result]);           //if not found then add the chat to the chats array
            }
            
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();

        }catch(err){
            toast({
                title: "Something went wrong code 2",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
                description: err.message
                });
            console.log(err);
        }
    }

    const handleSearch = async () => {
        if(!search){
            toast({
                title: "Please enter something to search",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-left"
              })
              return;
        }

        try{

            setLoading(true);

            const res = await fetch(`/api/user?search=${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            });

            const data = await res.json();

           // console.log(data);

            setSearchResult(data);

            setLoading(false);

        }catch(err){
            console.log(err);
            toast({
                title: "Something went wrong code 101",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-left"
                })
            setLoading(false);
            
        }
    }

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        width="100%"
        padding="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label = "Search users to Chat"
            hasArrow
            placement='bottom-end'
        >
            <Button variant="ghost">
            <i class="fa fa-search"></i>
            <Text d={{base:"none", md:"flex"}} px="4" onClick={onOpen}>
                Search User
            </Text>
            </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
            Talk-A-Tive
        </Text>
        <div>
            <Menu>
                <MenuButton p={1} fontSize="2xl" m = {1} >
                    <BellIcon />
                </MenuButton>
                {/* <MenuList></MenuList> */}
            </Menu>
            <Menu>
            <MenuButton as = {Button} rightIcon={<ChevronDownIcon/>}  >
                <Avatar size = 'sm' cursor = 'pointer' 
                name = {user.name}
                src= {user.pic}
                />
                </MenuButton>
                <MenuList>
                    <ProfileModal user={user}>
                    
                    <MenuItem>
                        Profile Pic
                    </MenuItem>

                    </ProfileModal>
                    <MenuDivider />
                    <MenuItem onClick={logoutHandler}>
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
      </Box>
      <Drawer 
       placement='left'
       onClose={onClose}
       isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>

        <DrawerHeader borderWidth={"1px"}>Search Users</DrawerHeader>

        <DrawerBody>
            <Box d="flex" pb={2}>
                <Input
                placeholder="Search by name/email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                mr = {2}
                />
                <Button
                    onClick={handleSearch}
                >
                Go
                </Button>
            </Box>
            {loading ? (
                <ChatLoading/>
            ):(
                <Box>
                    
                    {searchResult.map((user) => (
                        <UserListItem 
                            key={user._id}
                            user = {user}
                            handleFunction={()=>accessChat(user._id)}
                        />
                    ))}
                </Box>
            )}
            {loadingChat && <Spinner ml='auto' d='flex'/>}
        </DrawerBody>
        </DrawerContent>
      </Drawer>

    </div>
  )
}

export default SideDrawer
