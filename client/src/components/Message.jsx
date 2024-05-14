
import {Avatar, Text , Flex} from '@chakra-ui/react';

const Message = ({ownMessage}) => {
  return (
    <>
        {
            ownMessage
             ? 
            (
                <Flex 
                    gap={2}
                    alignSelf={"flex-end"}
                    >
                        <Text maxW={"350px"} bg={"blue.400"} p={1}
                            borderRadius={"md"}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel tortor id ligula efficitur fringilla. Nulla egestas, 
                                turpis non vulputate malesuada, sapien felis lobortis est, sit amet tincidunt nisl elit sed neque. 
                            </Text>
                            <Avatar src="" w="7" h={7}/>
                    </Flex>
            ) 
            : 
            (

                <Flex gap={2}>
                        <Avatar src="" w="7" h={7}/>
                        <Text maxW={"350px"} bg={"gray.400"} p={1} color="black" borderRadius={"md"}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            </Text>

                    </Flex>
            )
        }
    </>
  )
}

export default Message