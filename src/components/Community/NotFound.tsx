import { Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

const CommunityNotFound: React.FC = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
    >
      <Text fontSize={20}>
        Sorry, there aren't any communities on Reddit with that name.
      </Text>
      <Text mt={5} fontSize={15}>
        This community may have been banned or the community name is incorrect.
      </Text>
      <Flex mt={12}>
        <Link href="/">
          <Button height='35px' variant='outline' mr={2}>Create Community</Button>
        </Link>
        <Link href="/">
          <Button height='35px'>Go Home</Button>
        </Link>
      </Flex>
      <Flex align='center' mt={12} fontSize={12} color="gray.500" width='50vh' justifyContent='center'>
        Use of this site constitutes acceptance of our User Agreement and
        Privacy Policy. ©2023 reddit inc. All rights reserved. REDDIT and the
        ALIEN Logo are registered trademarks of reddit inc.
      </Flex>
    </Flex>
  );
};
export default CommunityNotFound;
