'use client'

import {
  Box,
  Flex,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'

export default function HeadLine() {

  const bgText = useColorModeValue('black', 'black')
  const bgHeadLine = useColorModeValue('gray.100', 'white')

  return (
    <Box textAlign="center" py={10} px={6} bg={bgHeadLine} >
      <Heading as="h2" size="xl" mt={6} mb={2} color={bgText} >
        Almacenadora JPLRLP
      </Heading>
      <Text color={'black'} mb={8}>
        Esta es nuestra almacenadora donde se gestiona diferentes productos de todo el país.
      </Text>

      <Flex justify="center" gap={6} wrap="nowrap" >
        {/* Card 1 */}
        <Box
          role={'group'}
          p={6}
          mt={10}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(https://images.unsplash.com/photo-1592085198739-ffcad7f36b54?q=80)`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src="https://images.unsplash.com/photo-1592085198739-ffcad7f36b54?q=80"
              alt="Bodega Norte"
              transition="transform 0.3s ease"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              Bodega Norte
            </Text>
            <Text fontWeight={800} fontSize={'xl'} textAlign="center">
              Almacena productos nacionales.
            </Text>
          </Stack>
        </Box>

        {/* Card 2 */}
        <Box
          role={'group'}
          p={6}
          mt={10}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(https://images.unsplash.com/photo-1601598704991-eef6114775e0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src="https://images.unsplash.com/photo-1601598704991-eef6114775e0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Bodega Sur"
              transition="transform 0.3s ease"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              Bodega Sur
            </Text>
            <Text fontWeight={800} fontSize={'xl'} textAlign="center">
              Recepción de importaciones.
            </Text>
          </Stack>
        </Box>

        {/* Card 3 */}
        <Box
          role={'group'}
          p={6}
          mt={10}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(https://images.unsplash.com/photo-1504376830547-506dedfe1fe9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src="https://images.unsplash.com/photo-1504376830547-506dedfe1fe9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Bodega Central"
              transition="transform 0.3s ease"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              Bodega Central
            </Text>
            <Text fontWeight={800} fontSize={'xl'} textAlign="center">
              Distribución nacional.
            </Text>
          </Stack>
        </Box>

        {/* Card 4 */}
        <Box
          role={'group'}
          p={6}
          mt={10}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(https://images.unsplash.com/photo-1578351709091-33ee78a1565d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src="https://images.unsplash.com/photo-1578351709091-33ee78a1565d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Bodega de Respaldo"
              transition="transform 0.3s ease"
              _groupHover={{ transform: 'scale(1.1)' }}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              Bodega de Respaldo
            </Text>
            <Text fontWeight={800} fontSize={'xl'} textAlign="center">
              Mercancía de emergencia.
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}
