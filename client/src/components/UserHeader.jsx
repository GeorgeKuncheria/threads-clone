import React,{useState} from 'react'

import {Avatar} from '@chakra-ui/avatar';
import {Box, VStack,Flex,Text,Link} from '@chakra-ui/layout';
import {Menu,MenuButton,MenuList,MenuItem,Portal,Button} from '@chakra-ui/react'
import {BsInstagram } from 'react-icons/bs';
import {CgMoreO}  from 'react-icons/cg';
import { useToast } from '@chakra-ui/react'
import {useRecoilValue} from "recoil";
import userAtom from './../atoms/userAtom.js';
import useFollowUnfollow from '../hooks/useFollowUnfollow.js';

import useShowToast from '../hooks/useShowToast';






const UserHeader = ({user}) => {

    const {handleFollowUnfollow,following,updating}= useFollowUnfollow(user);

    const copyURL = () => {
        const currentURL= window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                title: 'Link Copied.',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
        });
    };
    const currentUser = useRecoilValue(userAtom);
  return (
    <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={'space-between'} w={'full'}>
            <Box>
                <Text fontSize={'lg'} fontWeight={"bold"}>
                    {user.name}
                </Text>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={'sm'}>{user.username}</Text>
                    <Text fontSize={'xs'} bg={'gray.dark'} color={'gray.light'} p={1} borderRadius={"full"}>
                            threads.net
                    </Text>
                </Flex>
            </Box>
            <Box>
            { user.profilePic &&               
            <Avatar 
                name={user.name} 
                src={user.profilePic}
                size={{
                    base:'md',
                    md:'lg'
                }}
                />}
            { !user.profilePic &&               
            <Avatar 
                name={user.name} 
                src="https://bit.ly/broken-link"
                size={{
                    base:'md',
                    md:'lg'
                }}
                />}
            </Box>
        </Flex>

        <Text>{user.bio}</Text>

        {currentUser?._id===user._id && <Link href="/update">
                <Button size={"sm"}>Update Profile</Button>
        </Link>
        }

        {currentUser?._id!==user._id && 
                
                <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
                {following ? "Unfollow" : "Follow"}
                </Button>
        }
        <Flex w={"full"} justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
                <Text color={"gray.light"}>{user.followers.length} Followers</Text>
                <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
                <Link color={"gray.light"}>instagram.com</Link>
            </Flex>
            <Flex>
                <Box className='icon-container'>
                    <BsInstagram size={24} cursor={'pointer'}/>
                </Box>
                <Box className='icon-container'>
                    <Menu>
                        <MenuButton>
                            <CgMoreO size={24} cursor={'pointer'}/>
                        </MenuButton>
                        <Portal>
                            <MenuList bg={"gray.dark"}>
                                <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                </Box>
            </Flex>
        </Flex>

        <Flex w={'full'}>
        <Flex flex={1} borderBottom={'1.5px solid white'} pd="3" cursor={"pointer"} justifyContent={"center"}>
            <Text fontWeight={'bold'}>Threads</Text>
        </Flex>
        <Flex flex={1} borderBottom={'1.5px solid gray'} pd="3" cursor={"pointer"} color={"gray.light"} justifyContent={"center"}>
            <Text fontWeight={'bold'}>Replies</Text>
        </Flex>

        </Flex>


    </VStack>
  )
}

export default UserHeader