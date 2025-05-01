import { useState } from "react";
import { CustomInput } from "../Input";

import { useOut } from "../../shared/hooks/useGetMovementsSalida"; // Importa el hook correcto
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorModeValue,
  Stack,
  Heading,
  Flex,
} from "@chakra-ui/react";

export const Out = ({ switchOutHandler }) => { // Recibe switchEntryHandler
  const { registrarMovimientoSalida, isLoading } = useOut(); // Usa el hook correcto

  const [formState, setFormState] = useState({
    productId: { value: "", isValid: true, showError: false },
    quantity: { value: "", isValid: true, showError: false },
    reason: { value: "", isValid: true, showError: false },
    destiny: { value: "", isValid: true, showError: false }
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: { ...prevState[field], value },
    }));
  };

  const handleEntrySubmit = (e) => {
    e.preventDefault();
    registrarMovimientoSalida(formState.productId.value, formState.quantity.value, formState.reason.value, formState.destiny.value); // Llama a la función correcta
  };

  const formBackground = useColorModeValue("white", "gray.700");
  const labelColor = useColorModeValue("gray.700", "gray.200");
  const buttonColor = useColorModeValue("red.500", "red.800");

  return (
    <Flex
      position="relative"
      minH="100vh"
      align="center"
      justify="center"
      p={8}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={8}
        align="center"
        position="relative"
        zIndex={1}
      >
        <Box
          flex="1"
          bg={formBackground}
          p={8}
          borderRadius="md"
          boxShadow="dark-lg"
          maxW="md"
          w="full"
        >
          <Stack spacing={4}>
            <Heading fontSize="3xl" textAlign="center">
              Registrar Entrada
            </Heading>
            <form onSubmit={handleEntrySubmit}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel color={labelColor}>ID del Producto</FormLabel>
                  <Input
                    type="text"
                    value={formState.productId.value}
                    onChange={(e) => handleInputValueChange(e.target.value, 'productId')}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color={labelColor}>Cantidad</FormLabel>
                  <Input
                    type="number"
                    value={formState.quantity.value}
                    onChange={(e) => handleInputValueChange(e.target.value, 'quantity')}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color={labelColor}>Razon de salida</FormLabel>
                  <Input
                    type="number"
                    value={formState.reason.value}
                    onChange={(e) => handleInputValueChange(e.target.value, 'reason')}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color={labelColor}>destino</FormLabel>
                  <Input
                    type="number"
                    value={formState.destiny.value}
                    onChange={(e) => handleInputValueChange(e.target.value, 'destiny')}
                  />
                </FormControl>

                <Button
                  bg={buttonColor}
                  color="white"
                  _hover={{ bg: "red.700" }}
                  width="full"
                  type="submit"
                  isLoading={isLoading}
                  
                >
                  Registrar Salida
                </Button>
                <Button variant="outline" onClick={switchOutHandler}>
                  Volver a Movimientos
                </Button>
              </VStack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};