"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const NavLink = ({ children, to }) => {
  return (
    <Box
      as="div"
      px={3}
      py={2}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      <Link to={to}>{children}</Link>
    </Box>
  );
};

const NavLogo = () => {
  return (
    <Image 
      src="https://www.svgrepo.com/show/520503/quiz.svg"
      boxSize="50px"
      borderRadius="full"
      fit="cover"
      alt="Alamcenadora"
    />
  )
}

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} w="100%">
      <Flex
        maxW="auto"
        mx="auto"
        px={6}
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <HStack spacing={8} alignItems={"center"}>
          <NavLogo />
          <Box fontWeight="bold" fontSize="xl">
            Almacenadora
          </Box>
          <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
            <NavLink to="/products" >Products</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/team">Team</NavLink>
          </HStack>
        </HStack>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={6}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    ""
                  }
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={
                      ""
                    }
                  />
                </Center>
                <br />
                <Center>
                  <Text fontWeight="bold" pr='5%' pl='5%'>Name</Text>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <Link to='/'>
                  <MenuItem>Logout</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}