import { Button, Flex, Input, Stack, Image } from "@chakra-ui/react";
import React, { useRef } from "react";

type ImageUploadProps = {
  textInput: {
    title: string;
    body: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  textInput,
  onChange,
  selectedFile,
  onSelectImage,
  setSelectedTab,
  setSelectedFile,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        value={textInput.title}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
      />
      <Flex justify="center" align="center" direction='column'>
        {selectedFile ? (
          <>
            <Image src={selectedFile} maxWidth="400px" maxHeight="400px" />
            <Stack direction="row" mt={4}>
              <Button height="28px" onClick={() => setSelectedTab("Post")}>
                Back to Post
              </Button>
              <Button variant='outline' height='28px' onClick={() => setSelectedFile("")}>Remove</Button>
            </Stack>
          </>
        ) : (
          <Flex
            justify="center"
            p={20}
            align="center"
            border="1px dashed"
            borderColor="gray.200"
            width="100%"
            borderRadius={4}
          >
            <Button
              variant="outline"
              height="28px"
              onClick={() => selectedFileRef.current?.click()}
            >
              Upload
            </Button>

            <input
              ref={selectedFileRef}
              hidden
              type="file"
              onChange={onSelectImage}
            />
          </Flex>
        )}
      </Flex>
    </Stack>
  );
};
export default ImageUpload;
