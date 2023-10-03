import {useToast} from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Button } from '@chakra-ui/button'
import { VStack } from '@chakra-ui/layout'
import React, { useState } from 'react'

import { useHistory } from 'react-router-dom';

const Login = () => {

    const [show, setShow] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();


    const submitHandler = (e) => {

        if(email === undefined || password === undefined){
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

        try{

            const data = {email, password};

            fetch('http://localhost:5000/api/user/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                if(data.error){
                    toast({
                        title: data.error,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom"
                      });
                      setLoading(false);
                }else{
                    toast({
                        title: "Login Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom"
                        });
                    localStorage.setItem('userInfo', JSON.stringify(data)); // to store the user info in local storage
                    history.push('/chats');
                }
            })

        }catch(err){
            console.log(err);
        }
        
    }


  return (

    <VStack spacing="5px" color = "black">
        
        <FormControl id = "E-mail" isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input 
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value = {email}
            >
                
            </Input>
        </FormControl>

        <FormControl id = "password" isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
                <Input 
                    type = {show ? "text" : "password"} 
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value = {password}
                >
                </Input>

                <InputRightElement>
                    <Button 
                    h = '1.75rem' 
                    size = 'sm' 
                    onClick = {() => setShow(!show)} 
                    >
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            
            </InputGroup>
            
        </FormControl>

        <Button 
        colorScheme = 'green' 
        variant = 'solid' 
        width = 'full' 
        isLoading={loading} 
        onClick={submitHandler}
        >
            Login
        </Button>

        <Button 
        colorScheme = 'red' 
        variant = 'solid' 
        width = 'full' 
        onClick={()=>{
            setEmail("guest@example.com");
            setPassword("123456");
        }
        }
        >
            Get Guest User Credentials
        </Button>


    </VStack>
    
  )
}

export default Login
