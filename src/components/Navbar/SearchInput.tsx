import { Post } from "@/atoms/PostAtom";
import usePosts from "@/hooks/usePosts";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box, Flex, Input,
  InputGroup,
  InputLeftElement, Menu,
  MenuList, Text
} from "@chakra-ui/react";
// import { firestore } from 'firebase-admin';
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";
import MenuListItem from "./Directory/MenuListItem";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [lists, setList] = useState(Array<Post>);
  const router = useRouter();

  const filterPosts = (postsArr: Post[], search: string) => {
    return postsArr.filter((post: any) => {
      return (
        post.title.indexOf(search) !== -1 || post.body.indexOf(search) !== -1
      );
    });
  };

  const { postStateValue } = usePosts();

  const handleSearchInput = (input: string) => {
    if (input === "") {
      setSearchResultsOpen(false);
    } else {
      setSearchResultsOpen(true);
      setSearchInput(input);

      const results = filterPosts(postStateValue.posts, input);
      setList(results);
      setSearchResults(results);
    }

    setSearchQuery(input);
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      handleSearchInput(searchQuery);
      console.log(searchResults);
    }
  }, [searchQuery]);

  function trimStringToWords(inputString: string, numWords: number) {
    const words = inputString.split(" ");
    const trimmedWords = words.slice(0, numWords);
    return trimmedWords.join(" ");
  }

  return (
    <Flex zIndex={10} flexGrow={1} mr={2} align="center">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.400" mb={1} />}
          maxWidth={user ? "auto" : "600px"}
        />
        <Input
          placeholder="Search Reddit"
          // onChange={(event) => setSearchQuery(event.target.value)}
          onChange={(e) => handleSearchInput(e.target.value)}
          value={searchQuery}
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          bg="gray.50"
        />
      </InputGroup>
      {searchResultsOpen && (
        //     <Flex
        // pt={50}
        // >
        <Flex zIndex={100} mt={10} p={4} minW={500} position={"fixed"}>
          <Menu
            isOpen={searchResultsOpen}
            onClose={() => setSearchResultsOpen(false)}
            >
                <MenuList>
            <Box
            overflow={"auto"}
            position={'fixed'}
            borderRadius={10}
            pb={2}
            maxWidth={465}
            backgroundColor="white"
            >
              <Text
                pt={5}
                pl={3}
                mb={1}
                fontSize="7pt"
                fontWeight={800}
                color="gray.500"
                >
                Communities
              </Text>
              {lists.map((snippet) => (
                <MenuListItem
                  key={snippet.id}
                  icon={FaReddit}
                  displayText={`Community: r/${
                    snippet.communityId
                  }, Matches: ${trimStringToWords(snippet.body, 10)}`}
                  link={`/r/${snippet.communityId}/comments/${snippet.id}`}
                  iconColor="brand.500"
                  imageURL={snippet.imageURL}
                />
              ))}
            </Box>
              </MenuList>
          </Menu>
        </Flex>
      )}
      {/* {searchResultsOpen &&
        <Flex ml={20}>
        <Menu isOpen={searchResultsOpen}>
  <MenuList>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>
</Flex>
            <Menu isOpen={searchResultsOpen}>
       
                <MenuList>
                {ResultList.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={FaReddit}
            displayText={`r/${snippet.communityId} body: ${snippet.body}`}
            link={`/r/${snippet.communityId}`}
            iconColor={"blue.500"}
            imageURL={snippet.imageURL}
          />
        ))}


                </MenuList>
                {/* </Flex> 
               </Menu>
</Flex>*/}
      {/* } */}
    </Flex>
  );
};
export default SearchInput;
