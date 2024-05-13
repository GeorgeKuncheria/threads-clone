import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import SignupCard from './SignupCard';

  import {useSetRecoilState} from 'recoil';
  import authScreenAtom from '../atoms/authAtom';

  import useShowToast from './../hooks/useShowToast.js';
  import userAtom from './../atoms/userAtom.js';
  
  
  const LoginCard= () =>{
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen=useSetRecoilState(authScreenAtom);
    const setUser=useSetRecoilState(userAtom);
    const showToast=useShowToast();
    const [loading,setLoading] = useState(false);

    const [inputs,setInputs]= useState({
      username:'',
      password:''
    });

    const handleLogin=  async () =>{
      setLoading(true);

      try 
      {
        const res= await fetch ("/api/users/login",{
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify(inputs)
        });

        const data= await res.json();
        if (data.error){
          showToast("Error",data.error,'error');
        }

        else{
          showToast("Success","Succesfully Logged in!!",'success');
          localStorage.setItem("user-threads",JSON.stringify(data));
          setUser(data);
        }

      }

      catch(error){
        showToast("Internal Error","Not connected to the server",'error');
        console.log(error);
      }
      finally{
        setLoading(false);
      }

    }

    return (
      <Flex
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Login
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.dark')}
            boxShadow={'lg'}
            p={8}
            w={{
              base:"full",
              sm:"400px"
            }}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>UserName</FormLabel>
                <Input 
                type="username" 
                onChange={(e)=> setInputs({...inputs, username: e.target.value})}
                value={inputs.username}
                />
              </FormControl>
              <FormControl  isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input 
                  type={showPassword ? 'text' : 'password'} 
                  onChange={(e)=> setInputs({...inputs, password:e.target.value})}
                  value={inputs.password}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Logging In..."
                  size="lg"
                  bg={useColorModeValue("gray.600","gray.700")}
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue("gray.700","gray.800"),
                  }}
                  onClick={handleLogin}
                  isLoading={loading}>
                  Log In
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Don't have an account ? <Link color={'blue.400'} onClick={()=>setAuthScreen("signup")}>Sign Up</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }



export default LoginCard;