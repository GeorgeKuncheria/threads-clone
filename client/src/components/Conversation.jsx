import React from 'react';
import {Flex,useColorModeValue,WrapItem,Avatar,AvatarBadge,Stack,Image,Text,useColorMode,Box} from '@chakra-ui/react';
import userAtom from './../atoms/userAtom.js';
import {useRecoilValue,useRecoilState} from 'recoil';
import {BsCheck2All} from 'react-icons/bs';
import {selectedConversationsAtom} from './../atoms/messagesAtom.js'


const Conversation = ({conversation,isOnline}) => {
    const user= conversation.participants[0];
    const lastMessage=conversation.lastMessage;
    const currentUser= useRecoilValue(userAtom);
    const colorMode=useColorMode();

    const [selectedConversation,setSelectedConversation]= useRecoilState(selectedConversationsAtom);
    // console.log(selectedConversation);
  return (
    <Flex
        gap={4}
        alignItems={"center"}
        p={"1"}
        _hover={{
            cursor:"pointer",
            bg:useColorModeValue("gray.600","gray.dark"),
            color:"white"
        }}
        onClick={()=>{
            setSelectedConversation({
                _id:conversation._id,
                userId:user._id,
                userProfilePic:user.profilePic,
                username:user.username,
                mock:conversation.mock
            })
        }}
        bg={selectedConversation?._id === conversation._id ? (colorMode==='light' ? "gray.600" : "gray.dark") : ""} 
        borderRadius={"md"}
    >
        <WrapItem>
            <Avatar
                size={{
                    base:"xs",
                    sm:"sm",
                    md:"md"
                }}
                src={user.profilePic}
                name={user.username}
            >
            {isOnline ? <AvatarBadge boxSize="1em" bg='green.500'/> : " "}
            </Avatar>
        </WrapItem>

        <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight="700" display={"flex"} alignItems={"center"}>
                    {user.username} <Image src='/verified.png' w={4} h={4} ml={1}/>
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                    {currentUser._id===lastMessage.sender ? (
                        <Box color={lastMessage.seen ? "blue.400": ""}>
                            <BsCheck2All size={16 }/>
                        </Box>
                    ) : ""}
                    {lastMessage.text.length > 18 ? lastMessage.text.substring(0,18) + "..." : lastMessage.text}
                </Text>

        </Stack>

    </Flex>
  )
}

export default Conversation