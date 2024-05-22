import {useEffect,useState,useRef} from 'react';
import {Avatar,Divider, Flex,Image,Text,useColorModeValue,Skeleton,SkeletonCircle} from '@chakra-ui/react';
import Message from './../components/Message.jsx';
import MessageInput from './MessageInput.jsx';
import {useRecoilState,useRecoilValue,useSetRecoilState} from 'recoil';
import {selectedConversationsAtom} from  './../atoms/messagesAtom.js';
import useShowToast from './../hooks/useShowToast.js';
import userAtom from './../atoms/userAtom.js';
import { conversationsAtom } from './../atoms/messagesAtom.js';
import { useSocket } from "./../socket/SocketContext.jsx";
import messageSound from './../assets/sounds/iphone_message_tone.mp3';


const MessageContainer = () => {
    const [selectedConversation,setSelectedConversation]=useRecoilState(selectedConversationsAtom);
    const showToast=useShowToast();
    const [loadingMessages,setLoadingMessages] = useState(true);
    const [messages,setMessages] = useState([]);
    const currentUser = useRecoilValue(userAtom);
    const { socket } = useSocket();
	const setConversations = useSetRecoilState(conversationsAtom);
    const messageEndRef = useRef(null);


    useEffect(() => {
		socket.on("newMessage", (message) => {
			if (selectedConversation._id === message.conversationId) {
				setMessages((prev) => [...prev, message]);
			}

			// // make a sound if the window is not focused
			if (!document.hasFocus()) {
				const sound = new Audio(messageSound);
				sound.play();
			}

			setConversations((prev) => {
				const updatedConversations = prev.map((conversation) => {
					if (conversation._id === message.conversationId) {
						return {
							...conversation,
							lastMessage: {
								text: message.text,
								sender: message.sender,
							},
						};
					}
					return conversation;
				});
				return updatedConversations;
			});
		});

		return () => socket.off("newMessage");
	}, [socket, selectedConversation, setConversations]);


    useEffect(() => {
		const lastMessageIsFromOtherUser = messages.length && messages[messages.length - 1].sender !== currentUser._id;
		if (lastMessageIsFromOtherUser) {
			socket.emit("markMessagesAsSeen", {
				conversationId: selectedConversation._id,
				userId: selectedConversation.userId,
			});
		}

		socket.on("messagesSeen", ({ conversationId }) => {
			if (selectedConversation._id === conversationId) {
				setMessages((prev) => {
					const updatedMessages = prev.map((message) => {
						if (!message.seen) {
							return {
								...message,
								seen: true,
							};
						}
						return message;
					});
					return updatedMessages;
				});
			}
		});
	}, [socket, currentUser._id, messages, selectedConversation]);

    useEffect(() => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages])

    useEffect(() => {
        
        const getMessages= async() =>{
            setLoadingMessages(true);
            setMessages([]);
            try{
                if (selectedConversation.mock) return ;
                const res= await fetch(`/api/messages/${selectedConversation.userId}`)
                const data= await res.json(); 
                if (data.error){
                    showToast("Error" , data.error,'error');
                    return;
                }
                setMessages(data);
            }
            catch(error){
                showToast("Error",`${error.message}`,'error');
            }
            finally{
                setLoadingMessages(false);
            }
        }

        getMessages();
    }
    ,[showToast,selectedConversation])
  return (
    <Flex
        flex='90'
        bg={useColorModeValue('gray.200','gray.dark')}
        borderRadius={"md"}
        p={2}
        flexDirection={'column'}
    >
    {/* Message  */}
    <Flex 
        w={"full"}
        h={12}
        alignItems={"center"}
        gap={2}>
            <Avatar src={selectedConversation.userProfilePic} name={selectedConversation.username} size={"sm"}/>
            <Text display={"flex"} alignItems={"center"}>
                {selectedConversation.username} <Image src='/verified.png' w={4} h={4} ml={1}/>
            </Text>
        </Flex>

        <Divider/>


        <Flex 
            flexDir={"column"} gap={4} p={2} my={4}
            height={"400px"} overflowY={"auto"}
            >
            {loadingMessages  && (
                [...Array(5)].map((_,i)=> (
                    <Flex
                        gap={2}
                        alignItems={"center"}
                        p={1}
                        borderRadius={"md"}
                        alignSelf={i % 2 === 0 ?  "flex-start" : "flex-end"}
                    >
                    {i % 2 === 0  && <SkeletonCircle size={7}/>}
                    <Flex flexDir={"column"} gap={2}>
                        <Skeleton h="8px" w="250px"/>
                        <Skeleton h="8px" w="250px"/>
                        <Skeleton h="8px" w="250px"/>
                    </Flex>
                    {i % 2 !== 0  && <SkeletonCircle size={7}/>}


                    </Flex>
                )))}

            {!loadingMessages && (
                messages.map((message)=>{
                    return (
                        <Flex
							key={message._id}
							direction={"column"}
							ref={messages.length - 1 === messages.indexOf(message) ? messageEndRef : null}
						>
							<Message message={message} ownMessage={currentUser._id === message.sender} />
						</Flex>
                    )
                })
            )}
        </Flex>
                <MessageInput setMessages={setMessages}/>
    </Flex>
  )
}

export default MessageContainer