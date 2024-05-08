import React from 'react';
import {Flex,Button} from '@chakra-ui/react';
import {Link} from 'react-router-dom';

const HomePage = () => {
  return (
    <Link to= {'/zuckerberg'}>
        <Flex w={"full"} justifyContent={"center"}>
            <Button mx={"auto"}>Visit Profile Page</Button>
        </Flex>
    </Link>
  )
}

export default HomePage;