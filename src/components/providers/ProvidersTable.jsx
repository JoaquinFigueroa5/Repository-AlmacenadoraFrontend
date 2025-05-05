import {
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Card,
    CardHeader,
    CardBody,
    Button,
    Flex,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    List,
    ListItem,
    ModalFooter,
    ListIcon
} from "@chakra-ui/react";
import ProvidersRow from "./ProvidersRow";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useState } from "react";

const ProvidersTable = ({ provider, handleEditProvider, handleDeleteProvider, onClickAdd }) => {
    const textColor = useColorModeValue('gray.700', 'white');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedProvider, setSelectedProvider] = useState(null);

    const handleViewProducts = (provider) => {
        setSelectedProvider(provider);
        onOpen();
    };

    return (
        <>
            <Card
                overflowX={{ sm: "scroll", xl: "hidden" }}
                m={{ base: 4, md: 6 }}
                p={4}
                borderRadius="xl"
                boxShadow="md"
            >
                <CardHeader p='6px 0px 22px 0px'>
                    <Flex justifyContent="space-between" alignItems="center" >
                        <Text fontSize='xl' color={textColor} fontWeight='bold'>
                            Providers Table
                        </Text>
                        <Button
                            px={4}
                            fontSize="md"
                            rounded="full"
                            bg="gray.400"
                            color="white"
                            boxShadow="0px 8px 20px rgba(74, 85, 104, 0.45)"
                            _hover={{ bg: 'gray.500' }}
                            _focus={{ bg: 'gray.500' }}
                            onClick={onClickAdd}
                        >
                            Agregar
                        </Button>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Table variant='simple' color={textColor}>
                        <Thead>
                            <Tr my='.8rem' pl='0px' color='gray.400'>
                                <Th>
                                    Proveedor
                                </Th>
                                <Th>
                                    Telefono
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {provider.map((pro) => {
                                return (
                                    <ProvidersRow
                                        key={pro._id}
                                        provider={pro}
                                        handleEditProvider={handleEditProvider}
                                        onViewProducts={handleViewProducts}
                                    />
                                );
                            })}
                        </Tbody>
                    </Table>
                </CardBody>
                <Modal isOpen={isOpen} onClose={onClose} size="lg">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Productos de {selectedProvider?.name}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <List spacing={3}>
                                {(selectedProvider?.products?.length > 0)
                                    ? selectedProvider.products.map((product, idx) => (
                                        <ListItem key={idx}>
                                            <ListIcon as={CheckCircleIcon} color="green.500" />
                                            {typeof product === 'object' ? product.name : product}
                                        </ListItem>
                                    ))
                                    : <Text color="gray.500">Este proveedor no tiene productos asignados.</Text>}
                            </List>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>Cerrar</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Card>
        </>
    )
}

export default ProvidersTable;

