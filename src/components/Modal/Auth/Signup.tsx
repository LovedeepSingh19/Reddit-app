import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const setAuthState = useSetRecoilState(authModalState);
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) {
      setError("");
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Password do not Match");
      return;
    }

    createUserWithEmailAndPassword(signupForm.email, signupForm.password);
  };

  const onClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        fontSize="10pt"
        name="email"
        placeholder="Email"
        type="email"
        borderRadius={20}
        mb={2}
        onChange={onClick}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      />
      <Input
        required
        fontSize="10pt"
        name="password"
        placeholder="Password"
        type="password"
        borderRadius={20}
        mb={2}
        onChange={onClick}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      />
      <Input
        required
        fontSize="10pt"
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        borderRadius={20}
        mb={2}
        onChange={onClick}
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      />
      {(error || userError) && (
        <Text textAlign="center" textColor="red" fontSize="10pt">
          {(error) || userError && (
            FIREBASE_ERRORS[userError.message as keyof typeof FIREBASE_ERRORS])}
        </Text>
      )}
      <Button
        type="submit"
        width="100%"
        height="36px"
        mb={2}
        mt={2}
        isLoading={loading}
      >
        CONTINUE
      </Button>

      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={2}>Already a redditor?</Text>
        <Text
          color="blue.500"
          cursor="pointer"
          fontWeight={700}
          onClick={() =>
            setAuthState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          Log In
        </Text>
      </Flex>
    </form>
  );
};
export default Signup;
