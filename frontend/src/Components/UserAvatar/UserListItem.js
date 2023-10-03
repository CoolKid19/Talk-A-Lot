import React from 'react'

import { Avatar, Box, Text } from '@chakra-ui/react';
import { color } from 'framer-motion';

const UserListItem = ({user, handleFunction}) => {

    

  return (
    <Box
        onClick={handleFunction}
        cursor={"pointer"}
        bg={"#E8E8E8"}
        display={"flex"}
        _hover={
            {
                backgroundColor: "#38B2AC",
                color: "black"
            }
            
        }
        
        color={"black"}
        alignItems={"center"}
        padding={"20px"}
        width={"100%"}
        px={3}
        py={2}
        mb={2}
        borderRadius={"lg"}
    >

        <Avatar 
            mr={2}
            size={"sm"}
            cursor={"pointer"}
            name={user.name}
            src={user.pic}
        />
        <Box>
            <Text>{user.name}</Text>

            <Text fontSize={"xs"}>
                <b>Email : </b>
                {user.email}
            </Text>

        </Box>
            
      
    </Box>
  )
}

export default UserListItem