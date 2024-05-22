import React,{useState,useEffect} from 'react';
import {Text,Flex,Box,Skeleton,SkeletonCircle} from '@chakra-ui/react';
import SuggestedUser from './SuggestedUser.jsx';
import useShowToast from '../hooks/useShowToast.js';

const SuggestedUsers = () => {
    const [loading,setLoading]= useState(false);
    const [suggestedUsers,setSuggestedUsers]= useState([]);
    const {showToast}= useShowToast();  


    useEffect(() => {
		const getSuggestedUsers = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users/suggested");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setSuggestedUsers(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};

		getSuggestedUsers();
	}, [showToast]);


  return (
    <>
        <Text mb={4} fontWeight={"bold"}>
            Suggested Users
        </Text>
        <Flex direction={"column"} gap={4}>
            {!loading && suggestedUsers.map(user => { return (<SuggestedUser key={user._id} user={user}/>) })}
            {loading && 
                [0,1,2,3,4].map((_,idx)=>{
                    return (
                    <Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
                        <Box>
                            <SkeletonCircle size={"10"}/>
                        </Box>

                        <Flex w={"full"} flexDirection={"column"} gap={2}>
                            <Skeleton h={"8px"} w={"80px"} />
                            <Skeleton h={"8px"} w={"90px"} />
                        </Flex>

                        <Flex>
                            <Skeleton h={"20px"} w={"60px"} />
                        </Flex>
                    </Flex>
                    )

                })
            }
        </Flex>
    </>
  )
}

export default SuggestedUsers;




{/* <Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
<Box>
    <SkeletonCircle size={"10"}/>
</Box>

<Flex w={"full"} flexDirection={"column"} gap={2}>
    <Skeleton h={"8px"} w={"80px"} />
    <Skeleton h={"8px"} w={"90px"} />
</Flex>

<Flex>
    <Skeleton h={"20px"} w={"60px"} />
</Flex>
</Flex> */}