import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender } from '../config/ChatLogics'
import { ChatState } from '../Context/chatProvider'
import { Avatar, Tooltip } from '@chakra-ui/react'

const ScrollableChat = ({messages}) => {

    const {user} = ChatState();

  return (
    <ScrollableFeed>
      {messages && messages.map((message, index) => (
        <div key={message._id} 
            style={{display : "flex"}}>
                
                {
                    (isSameSender(messages, message, index, user._id) || isLastMessage(messages, index, user._id)) 
                    && (

                        <Tooltip
                            label = {message.sender.name}
                            placement = "bottom-start"
                            hasArrow
                        >
                            <Avatar 
                                mt = "7px"
                                mr = {1}
                                size="sm"
                                cursor="pointer"
                                name = {message.sender.name}
                                src = {message.sender.pic}
                            />

                        </Tooltip>

                    ) 
                }

        </div>
      ))    
    }
    </ScrollableFeed>
  )
}

export default ScrollableChat
