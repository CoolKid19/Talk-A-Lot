import { ViewIcon } from '@chakra-ui/icons'
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'




const ProfileModal = ({user, children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    
    <>
        {children ? (
            <span onClick={onOpen} >{children}</span>
        ):(
            <IconButton d = {{ base: "flex"}} 
            icon = {<ViewIcon />} 
            
            onClick={onOpen}
            />
        )}

<Modal size = "lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent height={"400px"}>
          <ModalHeader
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '30px',
              fontFamily: 'Work Sans'
            }}
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}          
          >
            <Image
                src={user.pic}
                alt={user.name}
                borderRadius='full'
                boxSize='150px'
            />

            <Text
                style={{
                    fontSize: {base: '29px', md: '30px'},
                    fontFamily: 'Work Sans'
                }}
            >
                Email : {user.email}
            </Text>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

export default ProfileModal
