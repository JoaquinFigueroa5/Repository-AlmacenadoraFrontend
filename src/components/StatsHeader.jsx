'use client'

import { useEffect } from 'react';
import { Container, Grid, GridItem, Flex, Box, Text, Heading, Spinner } from '@chakra-ui/react';
import { useStats } from '../shared/hooks'; // Asegúrate que la ruta esté correcta

function StatsHeader() {
  const { stats, isFetching, getStats } = useStats();

  useEffect(() => {
    getStats();
  }, []);

  

  return (
    <Container py={5} maxW={'container.lg'}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={6}
      >
        <GridItem w="100%" colSpan={{ base: 1, sm: 2, md: 2 }}>
          <Heading as={'h2'}>Estadísticas Generales</Heading>
        </GridItem>

        <GridItem w="100%">
          <Flex flexDirection={'column'}>
            {isFetching ? (
              <Spinner size="xl" />
            ) : (
              <>
                <Text fontSize={'4xl'} fontWeight={'bold'}>
                  {stats?.totalVentas ?? 0}
                </Text>
                <Box fontSize={'sm'}>Ventas totales</Box>
              </>
            )}
          </Flex>
        </GridItem>

        <GridItem w="100%">
          <Flex flexDirection={'column'}>
            {isFetching ? (
              <Spinner size="xl" />
            ) : (
              <>
                <Text fontSize={'4xl'} fontWeight={'bold'}>
                  {stats?.totalInventario ?? 0}
                </Text>
                <Box fontSize={'sm'}>Inventario total</Box>
              </>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default StatsHeader;