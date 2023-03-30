import { Community } from "@/atoms/communitiesAtom";
import { Flex, Box, Icon, Image, Text, Link, Button } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";
import useCommunityData from "@/hooks/useCommunityData";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );
  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="860px">
          {communityStateValue.currentCommunities?.imageURL ? (
            <Image
              borderRadius="full"
              boxSize="66px"
              alt="header image"
              position="relative"
              src={communityStateValue.currentCommunities.imageURL}
              top={-3}
              color='blue.500'
              border='4px solid white'
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                /r/{communityData.id}
              </Text>
              <Text fontWeight={600} color="gray.400" fontSize="10pt">
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              pr={6}
              pl={6}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
              height="30px"
              variant={isJoined ? "outline" : "solid"}
              isLoading={loading}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
