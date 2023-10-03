import {useToast} from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Button } from '@chakra-ui/button'
import { VStack } from '@chakra-ui/layout'

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = () => {
    
    const [show, setShow] = React.useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const submitHandler = (e) => {
        
        if(name === undefined || email === undefined || password === undefined || confirmpassword === undefined){
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
                });
                setLoading(false);
                return;
        }
        
        if(password !== confirmpassword){
            toast({
                title: "Passwords do not match",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
              });
              return;
        }

        try{

            const data = {name, email, password, pic};
            
            
            fetch('http://localhost:5000/api/user', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                
                if(data.error){
                    toast({
                        title: data.error,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom"
                      });
                      setLoading(false);
                      return;
                }
                toast({
                    title: data.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                    });

                    localStorage.setItem('userInfo', JSON.stringify(data)); // storing the user info in local storage
                    setLoading(false);

                    history.push('/chats'); // redirecting to chat page

            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })



        }catch(err){
            console.log(err);
        }

    }

    const postDetails = (pics) => {
        setLoading(true);
        if(pics===undefined){
            toast({
                title: "Please select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
              });

              return;
        }
        
        if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'chat-app');
            data.append('cloud_name', 'dtustm0ng');
            fetch('https://api.cloudinary.com/v1_1/dtustm0ng/image/upload', {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                setPic(data.url.toString());
                
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }else{
        toast({
            title: "Please select an image",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom"
          });
          setLoading(false);
          return;
    }
}


  return (
    <VStack spacing="5px" color = "black">
        <FormControl id = "first-name" isRequired>
            <FormLabel>
                Name
            </FormLabel>
            <Input 
                placeholder='User Name'
                onChange={(e) => setName(e.target.value)}
            >
                
            </Input>
        </FormControl>
        <FormControl id = "Email" isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input 
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
            >
                
            </Input>
        </FormControl>

        <FormControl id = "confirm-password" isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
                <Input 
                    type = {show ? "text" : "password"} 
                    placeholder='Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Input>

                <InputRightElement>
                    <Button h = '1.75rem' size = 'sm' onClick = {() => setShow(!show)} >
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            
            </InputGroup>
            
        </FormControl>

        <FormControl id = "Confirm-password" isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
                <Input 
                    type = {show ? "text" : "password"} 
                    placeholder='Confirm-Password'
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Input>

                <InputRightElement>
                    <Button h = '1.75rem' size = 'sm' onClick = {() => setShow(!show)} >
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            
            </InputGroup>
            
        </FormControl>

        <FormControl id = "Profile-pic" isRequired>
            <FormLabel>
                Profile Picture
            </FormLabel>
            <Input
                type = 'file'
                accept='image/*'
                onChange = {(e) => postDetails(e.target.files[0])}
            >
            </Input>
        </FormControl>

        <Button 
        colorScheme = 'green' 
        variant = 'solid' 
        width = 'full' 
        marginTop={15} 
        onClick={submitHandler} 
        isLoading = {loading}
        >
            Sign Up
        </Button>


    </VStack>
  )
}

export default Signup;
