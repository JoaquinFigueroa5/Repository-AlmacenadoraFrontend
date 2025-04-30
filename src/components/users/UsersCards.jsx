'use client'

import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

export const UsersCards = ({
    id,
    name,
    surname,
    username,
    email,
    phone,
    role,
    navigateToUserHandler
}) => {
    const handleNavigate = () => {
        navigateToUserHandler(id)
    }
    const [avatarURL, setAvatarURL] = useState();

    const imageSeed = id || Math.floor(Math.random() * 1000);

    useEffect(() => {
        const profilePicturaFecth = async () => {
            const response = await fetch('https://randomuser.me/api/');
            const data = await response.json();
            const profilePicUrl = data.results[0].picture.large;
            setAvatarURL(profilePicUrl);
        };

        profilePicturaFecth();
    }, []);

    return (
        <Center py={6}>
            <Box
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                >
                <Image
                    h={'120px'}
                    w={'full'}
                    src={`https://picsum.photos/400/200?random=${imageSeed}`}
                    objectFit="cover"
                    alt={`Nature background for ${name}`}
                />
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={
                            avatarURL
                        }
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <Stack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {name + ' ' + surname}
                        </Heading>
                        <Text color={'gray.500'}>{email}</Text>
                    </Stack>

                    <Stack direction={'row'} justify={'center'} spacing={6}>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>Role</Text>
                            <Text fontSize={'sm'} color={'gray.500'}>
                                {role}
                            </Text>
                        </Stack>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>Phone</Text>
                            <Text fontSize={'sm'} color={'gray.500'}>
                                {phone}
                            </Text>
                        </Stack>
                    </Stack>

                    <Button
                        w={'full'}
                        mt={8}
                        bg={useColorModeValue('#151f21', 'gray.900')}
                        color={'white'}
                        rounded={'md'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}>
                        Modify
                    </Button>
                </Box>
            </Box>
        </Center>
    )
}