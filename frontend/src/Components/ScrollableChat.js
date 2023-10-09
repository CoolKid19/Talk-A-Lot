import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics'
import { ChatState } from '../Context/chatProvider'
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";

const ScrollableChat = ({messages}) => {

    const {user} = ChatState();

  return (
    <ScrollableFeed>
      {messages 
      
      && messages.map((message, index) => (
        <div key={message._id} 
            style={{display : "flex"}}>   
                    
                    {
  (isSameSender(messages, message, index, user._id) || 
  isLastMessage(messages, index, user._id)) && (
    console.log("true"),
    <>
      <Tooltip
        label={message.sender.name}
        placement="bottom-start"
        hasArrow
      >
        <Avatar 
          mt="7px"
          mr={1}
          size="sm"
          cursor="pointer"
          name={message.sender.name}
          src={message.sender.pic}
        />
      </Tooltip>
    </>
  )
}
                    
                    

                    <span
                        style={{
                            background: `${
                                message.sender._id === user._id ? "#2979ff" : "#38B2AC"
                            }`,

                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                            marginLeft: isSameSenderMargin(messages, message, index, user._id),
                            marginTop: isSameUser(messages, message, index, user._id) ? 3 : 10, 
                        }}
                    >
                        {message.content}
                    </span>



        </div>
      ))    
    }
    </ScrollableFeed>
  )
}

export default ScrollableChat
