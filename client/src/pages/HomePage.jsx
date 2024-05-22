import React,{useEffect,useState} from 'react';
import {Flex,Button,Spinner,Box} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import useShowToast from './../hooks/useShowToast.js';
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import Post from './../components/Post.jsx';
import SuggestedUsers from './../components/SuggestedUsers.jsx';

const HomePage = () => {
  const showToast = useShowToast();
  const [posts,setPosts]=useRecoilState(postsAtom);
  const [loading,setLoading] = useState(true);
	
  
  useEffect(() => {
		const getFeedPosts = async () => {
			setLoading(true);
			setPosts([]);
			try {
				const res = await fetch("/api/posts/feed");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}

				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getFeedPosts();
	}, [showToast, setPosts]);


  return (
    <Flex gap='10' alignItems={'flex-start'}>
      <Box flex={70}>
      {!loading && posts.length===0 && (<h1>Follow some users to see the feed.</h1>)}
      { loading && (
          <Flex justify={"center"}>
            <Spinner size="xl"/>
          </Flex>
      )
      }

      {posts.map((post)=>{
        return (
          <Post key={post._id}  post={post} postedBy={post.postedBy}/>
        )
      })}
      </Box>
      <Box flex={30}
      display={{
        base: "none",
        md:"block",
      }}
      >
        <SuggestedUsers/>
      </Box>
    </Flex>
    
  )
}

export default HomePage;