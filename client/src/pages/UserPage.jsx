import React from 'react'
import UserHeader from '../components/UserHeader.jsx'
import UserPost from  '../components/UserPost.jsx'

import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useShowToast from './../hooks/useShowToast.js';
import {Spinner,Flex} from '@chakra-ui/react';






const UserPage = () => {
  const [user,setUser]= useState(null);
  const {username} = useParams();
  const [loading,setLoading] = useState(true);


  const toast= useShowToast();
  useEffect(() => {
    const getUser = async () =>{
      try{
          const res= await fetch(`api/users/profile/${username}`);
          const data= await res.json();
         setUser(data);
          if (data.error){
            toast("Error",data.error,'error');
          }
      }
      catch(error){
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }

    getUser();
  },[username,toast]);


  if (!user && loading){
    return (
      <Flex justifyContent={"center"}>
              <Spinner size='xl'/>
      </Flex>

    )
  }

    if (!user && loading){
      return (
        <h1>User Not Found</h1>
      )
  }
  if(!user){
    return null;
  }

  
  return (
    <>
        <UserHeader user={user}/>
        <UserPost likes={1450} replies={1243} postImg="/post1.png" postTitle="Let's talk about Threads "/>
        <UserPost likes={133} replies={45} postImg="/post2.png" postTitle="Let's get ready for threads"/>
        <UserPost likes={1234} replies={543} postImg="/post3.png" postTitle="I love threads"/>
    </>
  )

}

export default UserPage