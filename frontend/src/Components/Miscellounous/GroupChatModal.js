import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/chatProvider';

const GroupChatModal = ({children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupChatName, setGroupChatName] = useState();

    const toast = useToast();

    const handleSearch = async (search) => {

    }
    const handleSubmit = async () => {
            
    }

    const { user, chats, setChats} = ChatState();
    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose}>
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
                alignContent={"center"}
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
                {/* selected users */}
                {/* render searched users */}
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                  Create Group Chat
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal
