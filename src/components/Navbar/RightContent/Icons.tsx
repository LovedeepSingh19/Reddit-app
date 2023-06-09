import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import {GrAdd} from "react-icons/gr"
import {IoFilterCircleOutline, IoNotificationsOutline, IoVideocamOutline} from "react-icons/io5"

const Icons: React.FC = () => {
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderColor="gray.200"
        borderRight="1px solid"
      >
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          fontSize={20}
        >
          <Icon as={BsArrowUpRightCircle} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          fontSize={22}
          >
          <Icon as={IoFilterCircleOutline} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          fontSize={22}
        >
          <Icon as={IoVideocamOutline} />
        </Flex>
      </Flex>
      <>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          fontSize={20}
        >
          <Icon as={BsChatDots} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          fontSize={20}
        >
          <Icon as={IoNotificationsOutline} />
        </Flex>
        <Flex
          mr={1.5}
          display={{base:"none", md:"flex"}}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          fontSize={20}
        >
          <Icon as={GrAdd} />
        </Flex>
      </>
    </Flex>
  );
};
export default Icons;
