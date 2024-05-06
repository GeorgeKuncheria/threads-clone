import React from 'react';


import {Avatar} from '@chakra-ui/avatar';
import {Box,Flex,Text} from '@chakra-ui/layout';
import {Image} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {BsThreeDots} from 'react-icons/bs';
import Actions from './Actions';
import { useState } from 'react';
import {Menu,MenuButton,MenuList,MenuItem,Portal,Button,Divider} from '@chakra-ui/react'

const UserPost = ({likes,replies,postImg,postTitle}) => {
    const [liked,setLiked]=useState(false);
  return (
    <Link to={'/markzuckerberg/post/1'}>
        <Flex gap={3} mb={4} py={5} >
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar 
                size='md' 
                name="MarkZuckerberg" 
                src='/zuck-avatar.png'

                />
                <Box w='1px' h={'full'} bg='gray.light' my={2}></Box>
                <Box position={"relative"} w={"full"}>
                    <Avatar 
                    size='xs' 
                    name="John Doe" 
                    src='https://bit.ly/dan-abramov'
                    position={"absolute"}
                    top={"0px"}
                    left="15px"
                    padding={"2px"}
                    />

                    <Avatar 
                    size='xs' 
                    name="Sage - Adebayo" 
                    src='https://bit.ly/sage-adebayo'
                    position={"absolute"}
                    bottom={"0px"}
                    right="-5px"
                    padding={"2px"}
                    />

                    <Avatar 
                    size='xs' 
                    name="Propser Baba" 
                    src='https://bit.ly/prosper-baba'
                    position={"absolute"}
                    bottom={"0px"}
                    left="4px"
                    padding={"2px"}
                    />
                </Box>
            </Flex>
            <Flex flex={1} flexDirection={"column"} gap={2}>
                <Flex justifyContent={"space-between"} w={"full"}>
                    <Flex w={"full"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}> 
                            MarkZuckerberg
                        </Text>
                        <Image src="/verified.png" w={4} h={4} ml={1}/>
                    </Flex>
                    <Flex gap={4}alignItems={"center"}>
                        <Text  fontStyle={"sm"} color={"gray.light"}>
                            1d
                        </Text> 
                        <Box className='icon-container' onClick={(e)=>e.preventDefault()}>
                            <Menu>
                                <MenuButton position={"relative"} left={"3px"} top={"3px"} >
                                    <BsThreeDots/>
                                </MenuButton>
                                <Portal>
                                    <MenuList bg={"gray.dark"}>
                                        <MenuItem bg={"gray.dark"}>Download</MenuItem>
                                        <MenuItem bg={"gray.dark"}>Create a Copy</MenuItem>
                                    </MenuList>
                                </Portal>
                            </Menu>
                        </Box>
                    </Flex>
                </Flex>
                <Text fontSize={"sm"}>{postTitle}</Text>
                {postImg && (
                <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                    <Image src={postImg} w={"full"}/>
                </Box>
                )
                }

                <Flex gap={3} my={1}>
                    <Actions liked={liked} setLiked={setLiked}/>
                </Flex>

                <Flex gap={2} alignItems={'center'}>
                    <Text color={"gray.light"} fontSize={"sm"}>
                        {replies} replies
                    </Text>
                    <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
                    <Text color={"gray.light"} fontSize={"sm"}>
                        {likes} likes
                    </Text>
                </Flex>
            </Flex>
        </Flex>
        <Divider my={4}/>
    </Link>
    
  )
}

export default UserPost