import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import ResetPassword from ".//ResetPassword";
import {
  Button,
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleOnClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    if (user) {
      handleOnClose();
      console.log(user);
    }
  }, [user]);

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            alignContent="center"
            justifyContent="center"
          >
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
              pb={6}
            >
              {modalState.view==="login" || modalState.view==="signup"?(
                <>
                  <OAuthButtons />
                  <Text color="gray.500" fontWeight={700}>
                    Or
                  </Text>
                  <AuthInputs />
                </>
              ):  <ResetPassword />}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
