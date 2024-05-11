import {Button} from '@chakra-ui/react';
import {Container} from '@chakra-ui/react';
import {Route,Routes,Navigate} from 'react-router-dom';

import Auth from './pages/Auth';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import HomePage from './pages/HomePage';
import UpdateProfilePage from './pages/UpdateProfilePage';


import Header from './components/Header';


import LogoutButton from './components/LogoutButton';

import {useRecoilValue} from 'recoil';
import userAtom from './atoms/userAtom';


function App() {

  const user= useRecoilValue(userAtom);

  return (
    <>
    <Container maxW='620px'>
    <Header/>
    <Routes>
      <Route path="/" element={user ? <HomePage/> : <Navigate to= '/auth'/>}/>

      <Route path="/auth" element={!user ? <Auth/> :  <Navigate to= '/'/>}/>

      <Route path="/update" element={user ? <UpdateProfilePage/> :  <Navigate to= '/auth'/>}/>

      <Route path='/:username' element={<UserPage/>}/>

      <Route path='/:username/post/:pid' element={<PostPage/>}/>
    </Routes>

    {user && <LogoutButton/>   }
        
    </Container>
    </>
  )
}

export default App
