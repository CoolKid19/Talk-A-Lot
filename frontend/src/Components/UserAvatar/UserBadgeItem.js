import { CloseIcon } from '@chakra-ui/icons'
import { Badge } from '@chakra-ui/layout'
import React from 'react'

const UserBadgeItem = ({user, handleFunction}) => {
    console.log(user);
  return (
    < Badge
        px={2}
        py={1}
        borderRadius={"lg"}
        m={1}
        mb={2}
        bgColor="blue.800"
        color={"white"}
        fontSize={12}
        onClick={handleFunction}
        
    >
  
        {user.name}
        <CloseIcon pl={1} />
    </Badge>
  )
}

export default UserBadgeItem
