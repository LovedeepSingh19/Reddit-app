import { authModalState } from "@/atoms/authModalAtom";
import { Post } from "@/atoms/PostAtom";
import PageContent from "@/components/Layout/PageContent";
import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import PostItem from "@/components/Posts/PostItem";
import PostLoader from "@/components/Posts/PostLoader";
import { auth, firestore } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import usePosts from "@/hooks/usePosts";
import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { collection, orderBy } from "@firebase/firestore";
import { User } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GiSteamBlast } from "react-icons/gi";
import { useSetRecoilState } from "recoil";

type indexProps = {};

const index: React.FC<indexProps> = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const setAuthModal = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stateValue, setPosts] = useState(Array<Post>);
  useEffect(() => {
    if (user) {
      getPosts(user);
    }
  }, [user]);

  const ListPosts: Array<Post> = [];
  const { postStateValue, onVote, onDeletePost, onSelectPost } = usePosts();

  const getPosts = async (user: User) => {
    try {
      setLoading(true);
      const postQuery = query(
        collection(firestore, "posts"),
        where("creatorId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      posts.map((post: Object) => {
        ListPosts.push(post as Post);
      });
      setPosts(ListPosts);
    } catch (error: any) {
      console.log("getPost error ", error);
    }
    setLoading(false);
  };

  const onClick = () => {
    if (!user) {
      setAuthModal({ open: true, view: "login" });
      return;
    }
    const { communityId } = router.query;
    if (communityId) {
      router.push(`/r/${communityId}/submit`);
      return;
    }

    toggleMenuOpen();
  };
  var formattedDate;
  if (user) {
    const dateString = user.metadata.creationTime!;
    const parts = dateString.split(" ");
    const month = parts[2];
    const day = parts[1];
    const year = parts[3];

    formattedDate = `${month} ${day} ${year}`;
  }

  return (
    <Flex align="center" justify="space-evenly">
      <PageContent>
        <>
          <Text
            align={"center"}
            fontWeight={600}
            justifyContent={"center"}
            borderRadius={8}
            mb={2}
            p={1}
            backgroundColor={"white"}
          >
            Your Posts
          </Text>
          <Stack>
            {loading ? (
              <PostLoader />
            ) : (
              <>
                {stateValue.length === 0 ? (
                  <Flex>
                    <Text
                      align={"center"}
                      fontWeight={500}
                      justifyContent={"center"}
                      borderRadius={8}
                      mb={2}
                      p={1}
                      backgroundColor={"white"}
                    >{`hmm... u/${user?.displayName} hasn't posted anything`}</Text>
                  </Flex>
                ) : (
                  <Stack>
                    {stateValue.map((item) => (
                      <PostItem
                        key={item.id}
                        post={item}
                        userIsCreator={true}
                        userVoteValue={
                          postStateValue.postVotes.find(
                            (vote) => vote.postId === item.id
                          )?.voteValue
                        }
                        onVote={onVote}
                        onSelectPost={onSelectPost}
                        onDeletePost={onDeletePost}
                      />
                    ))}
                  </Stack>
                )}
              </>
            )}
          </Stack>
        </>
        <Stack minW={200} width="90%" spacing={5}>
          <>
            <CreateCommunityModal
              open={open}
              handleClose={() => setOpen(false)}
            />
            <Flex
              direction="column"
              bg="white"
              borderRadius={4}
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
                bgColor={"blue.400"}
                bgSize="cover"
              ></Flex>
              <Flex direction="column" p="12px">
                <Flex align="center" justify={"center"} mb={2}>
                  <Text fontWeight={600}>{user?.displayName}</Text>
                </Flex>
                <Stack justify={"center"} align={"center"} spacing={3}>
                  <Text
                    fontSize={"9pt"}
                    color="gray.400"
                  >{`u/${user?.displayName}`}</Text>
                  <Stack
                    spacing={"45pt"}
                    direction={"row"}
                    justify={"space-between"}
                    align={"space-between"}
                  >
                    <Text fontSize={"9pt"} fontWeight={600}>
                      Karma
                    </Text>
                    <Text fontSize={"9pt"} fontWeight={600}>
                      Cake Day
                    </Text>
                  </Stack>
                  <Stack
                    spacing={"40pt"}
                    direction={"row"}
                    justify={"space-between"}
                    align={"space-between"}
                  >
                    <Text fontSize={"9pt"}>
                      <Icon
                        as={GiSteamBlast}
                        fontSize={15}
                        color="blue.400"
                        mr={1}
                      />{" "}
                      1
                    </Text>
                    <Text fontSize={"9pt"}>{formattedDate}</Text>
                  </Stack>
                  <Button width={"100%"} height="30px" onClick={onClick}>
                    New Post
                  </Button>
                </Stack>
              </Flex>
            </Flex>
          </>
        </Stack>
      </PageContent>
    </Flex>
  );
};
export default index;
