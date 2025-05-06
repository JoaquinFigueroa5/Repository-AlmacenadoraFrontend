import {
  Avatar,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

function ProvidersRow({ provider, handleEditProvider, onViewProducts }) {
  const textColor = useColorModeValue("gray.700", "white");
  const bgRow = useColorModeValue('gray.100', 'gray.600');
  const [avatarURL, setAvatarURL] = useState();

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        setAvatarURL(data.results[0].picture.large);
      } catch (error) {
        console.error('Error al cargar avatar:', error);
      }
    };
    fetchAvatar();
  }, []);

  return (
    <>
      <Tr
        sx={{
          transition: "transform 0.2s ease-in-out",
          _hover: {
            transform: "scale(1.05)",
            zIndex: 1,
            boxShadow: "md",
            bg: bgRow,
          },
        }}
        onClick={() => handleEditProvider(provider)}
      >
        <Td pl="0px">
          <Flex align="center" py=".8rem">
            <Avatar src={avatarURL} w="50px" borderRadius="12px" me="18px" />
            <Flex direction="column">
              <Text fontSize="md" color={textColor} fontWeight="bold">
                {provider.name}
              </Text>
            </Flex>
          </Flex>
        </Td>

        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {provider.phone}
          </Text>
        </Td>

        <Td>
          <Button
            variant="link"
            onClick={(e) => {
              e.stopPropagation();
              onViewProducts(provider);
            }}
          >
            Products
          </Button>
        </Td>
      </Tr>

    </>
  );
}

export default ProvidersRow;
