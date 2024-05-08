import {Button} from '@chakra-ui/react';
import {Container} from '@chakra-ui/react';
import {Route,Routes} from 'react-router-dom';

import Auth from './pages/Auth';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';




function App() {


  return (
    <>
    <Container maxW='620px'>
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path='/:username' element={<UserPage/>}/>
      <Route path='/:username/post/:pid' element={<PostPage/>}/>
    </Routes>
        
    </Container>
    </>
  )
}

export default App
