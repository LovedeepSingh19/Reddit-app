import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";

import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import CreateCommunityModal from "../Modal/CreateCommunity/CreateCommunityModal";


const PersonalHome: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const setAuthModal = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();

  const [open, setOpen] = useState(false);

  const onClickCommunity = () => {
    if(!user){
      setAuthModal({ open: true, view: "login" });
      return;
    }else{
      setOpen(true);
    }

  }

  const onClick = () => {
    if (!user) {
      setAuthModal({ open: true, view: "login" });
      return;
    }
    const { communityId } = router.query;
    if (communityId) {
      router.push(`/r/${communityId}/submit`);
      return
    }

    toggleMenuOpen();
  };

  
  return (
    <>
          <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
      position="sticky"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="34px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/redditPersonalHome.png)"
        bgSize="cover"
      ></Flex>
      <Flex direction="column" p="12px">
        <Flex align="center" mb={2}>
          <Icon as={FaReddit} fontSize={50} color="brand.100" mr={2} />
          <Text fontWeight={600}>Home</Text>
        </Flex>
        <Stack spacing={3}>
          <Text fontSize="9pt">
            Your personal Reddit frontpage, build for you.
          </Text>
          <Button height="30px" onClick={onClick}>Create Post</Button>
          <Button variant="outline" height="30px" onClick={onClickCommunity}>
            Create Community
          </Button>
        </Stack>
      </Flex>
    </Flex>
    </>
  );
};
export default PersonalHome;
