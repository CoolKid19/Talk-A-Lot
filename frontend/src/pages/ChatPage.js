import {ChatState} from "../Context/chatProvider";
import {Box} from "@chakra-ui/react";

import SideDrawer from "../Components/Miscellounous/SideDrawer";
import MyChats from "../Components/MyChats";
import ChatBox from "../Components/Miscellounous/ChatBox";
import { useState } from "react";

export default function ChatPage() {

    const {user} = ChatState();

    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div style = {{width: "100%"}}>

            {user && <SideDrawer/>}
            <Box
             display={"flex"}
             justifyContent={"space-between"}
             height={"91.5vh"}
             padding={"20px"}
             width={"100%"}
            >
                {user && <MyChats fetchAgain = {fetchAgain} />}
                {user && <ChatBox fetchAgain = {fetchAgain} setFetchAgain = {setFetchAgain} />}
            </Box>


        </div>
    )
}