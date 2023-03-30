import { authModalState } from "@/atoms/authModalAtom";
import { communityState } from "@/atoms/communitiesAtom";
import About from "@/components/About";
import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid white">
          <Text>Create a post</Text>
        </Box>
        {user ? (
          <NewPostForm user={user} communityImageURL={communityStateValue.currentCommunities?.imageURL} />
        ) : (
          setAuthModalState({ open: true, view: "login" })
        )}
      </>
      <>
        {communityStateValue.currentCommunities && (
          <About communityData={communityStateValue.currentCommunities} />
        )}
      </>
    </PageContent>
  );
};
export default SubmitPostPage;
