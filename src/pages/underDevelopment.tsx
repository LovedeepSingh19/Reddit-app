import PersonalHome from '@/components/Community/PersonalHome';
import Premium from '@/components/Community/Premium';
import Recommendations from '@/components/Community/Recommendations';
import PageContent from '@/components/Layout/PageContent';
import { Flex, Text, Stack } from '@chakra-ui/react';
import React from 'react';

type underDevelopmentProps = {
    
};

const underDevelopment:React.FC<underDevelopmentProps> = () => {
    
    return (
        <Flex align='center' justify='space-evenly' >
        <PageContent>
          <Flex 
            height={"80%"}
            backgroundColor={"white"}
            >

          <Text
            align={"center"}
            fontWeight={600}
            justifyContent={"center"}
            alignContent={'center'}
            mt={"40%"}
            borderRadius={8}
            mb={2}
            p={1}
          >

                These Pages are under development try again later
            </Text>
          </Flex>
          <Stack width="80%" spacing={5}>
            <Recommendations />
            <PersonalHome />
          </Stack>
        </PageContent>
        </Flex>
    )
}
export default underDevelopment;