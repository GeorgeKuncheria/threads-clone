import React from 'react'

import {Avatar} from '@chakra-ui/avatar';
import {Box, VStack,Flex,Text,Link} from '@chakra-ui/layout';
import {Menu,MenuButton,MenuList,MenuItem,Portal} from '@chakra-ui/react'
import {BsInstagram } from 'react-icons/bs';
import {CgMoreO}  from 'react-icons/cg';
import { useToast } from '@chakra-ui/react'





const UserHeader = () => {
    const toast = useToast()
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

  return (
    <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={'space-between'} w={'full'}>
            <Box>
                <Text fontSize={'lg'} fontWeight={"bold"}>
                    Mark Zuckerberg
                </Text>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={'sm'}>zuckerberg</Text>
                    <Text fontSize={'xs'} bg={'gray.dark'} color={'gray.light'} p={1} borderRadius={"full"}>
                            threads.net
                    </Text>
                </Flex>
            </Box>
            <Box>
                <Avatar 
                name="Mark Zuckerberg" 
                src='/zuck-avatar.png' 
                size={{
                    base:'md',
                    md:'lg'
                }}

                />
            </Box>
        </Flex>

        <Text>Co-Founder,executive,chairman and CEO of Meta Platforms.</Text>
        <Flex w={"full"} justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
                <Text color={"gray.light"}>3.2K Followers</Text>
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