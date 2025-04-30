import { Box } from '@chakra-ui/react'
import NavBar from '../components/NavBar';
import BarListComponent from '../components/BarList';
import StatsHeader from '../components/StatsHeader';
import ProductList from '../components/ProductList';
import { Grid,GridItem } from "@chakra-ui/react"

export const Stats = () => {
  return (
    <Box bg="brand.fondo" minH="100vh" w="100%">
        <NavBar />

        <Grid templateColumns="repeat(2, 1fr)" gap="6">
            <GridItem>
            <StatsHeader />
            <BarListComponent />
            </GridItem>
            <GridItem>
                <ProductList />
               
            </GridItem>
        </Grid>
        
        
    </Box>
  )
}
