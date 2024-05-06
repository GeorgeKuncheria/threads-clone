import React from 'react'
import UserHeader from '../components/UserHeader.jsx'
import UserPost from  '../components/UserPost.jsx'


const UserPage = () => {
  return (
    <>
        <UserHeader/>
        <UserPost likes={1450} replies={1243} postImg="/post1.png" postTitle="Let's talk about Threads "/>
        <UserPost likes={133} replies={45} postImg="/post2.png" postTitle="Let's get ready for threads"/>
        <UserPost likes={1234} replies={543} postImg="/post3.png" postTitle="I love threads"/>
    </>
  )
}

export default UserPage