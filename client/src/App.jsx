import {Button} from '@chakra-ui/react';
import {Container,Box} from '@chakra-ui/react';
import {Route,Routes,Navigate,useLocation} from 'react-router-dom';

import Auth from './pages/Auth';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import HomePage from './pages/HomePage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import ChatPage from './pages/ChatPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';


import Header from './components/Header';
import LogoutButton from './components/LogoutButton';
import CreatePost from './components/CreatePost';

import {useRecoilValue} from 'recoil';
import userAtom from './atoms/userAtom';



function App() {

  const user= useRecoilValue(userAtom);
  const {pathname}=useLocation();

  return (
    <Box position={"relative"} w="full ">
    <Container maxW={pathname==='/' ? {base:"620px",md:"900px"} : "620px"}>
    <Header/>
    <Routes>
      <Route path="/" element={user ? <HomePage/> : <Navigate to= '/auth'/>}/>

      <Route path="/auth" element={!user ? <Auth/> :  <Navigate to= '/'/>}/>

      <Route path="/update" element={user ? <UpdateProfilePage/> :  <Navigate to= '/auth'/>}/>

      <Route
						path='/:username'
						element={
							user ? (
								<>
									<UserPage />
									<CreatePost />
								</>
							) : (
								<Auth />
							)
						}
					/>

      <Route path='/:username/post/:pid' element={<PostPage/>}/>
      <Route path='/chat' element={user ? <ChatPage/> : <Navigate to ={`/auth`}/>}/>
      <Route path='/settings' element={user ? <SettingsPage/> : <Navigate to ={`/auth`}/>}/>


    </Routes> 

        
    </Container>
    </Box>
  )
}

export default App
