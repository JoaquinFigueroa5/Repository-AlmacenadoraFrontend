import {
  Button,
  Card,
  CardBody,
  Image,
  Text,
  Badge,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import '../../pages/products/ProductPage.css';  // Asegúrate de importar el archivo CSS

export const ProductCard = ({ product, onBuy, onAddToCart }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();  // Control de estado para el modal

  return (
    <>
      {/* Card normal */}
      <Card
        className="product-card"
        onClick={onOpen} // Abre el modal al hacer clic
      >
        <Image
          src={product.image}
          alt={product.name}
          objectFit="cover"
          height="200px"
          width="100%"
        />
        <CardBody padding="4">
          <Stack spacing="1">
            <Text fontSize="xl" fontWeight="bold">{product.name}</Text>
            <Badge colorScheme="purple" width="fit-content">{product.category}</Badge>
            <Text fontSize="md" color="green.500" mt="2">
              Q{parseFloat(product.price.$numberDecimal).toFixed(2)}
            </Text>
            <Text fontSize="sm" color={product.stock > 0 ? "teal.500" : "red.500"}> 
              Stock: {product.stock}
            </Text>
          </Stack>
        </CardBody>
      </Card>

      {/* Modal para mostrar la card expandida */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" className="modal-product">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="modal-header">{product.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="modal-body">
            <Stack spacing="1">
              <Image
                src={product.image}
                alt={product.name}
                className="product-image" 
              />
              <Text fontSize="xl" fontWeight="bold">{product.name}</Text>
              <Badge colorScheme="purple" width="fit-content">{product.category}</Badge>
              <Text fontSize="md" color="green.500" mt="2">
                Q{parseFloat(product.price.$numberDecimal).toFixed(2)}
              </Text>
              <Text fontSize="sm" color={product.stock > 0 ? "teal.500" : "red.500"}>
                Stock: {product.stock}
              </Text>
              <Text fontSize="sm" color="gray.600">{product.description}</Text>
            </Stack>
          </ModalBody>
          <ModalFooter className="modal-footer">
            <Button colorScheme="teal" onClick={() => onBuy(product._id)} className="modal-button">
              Editar
            </Button>
            <Button colorScheme="red" variant="outline" onClick={() => onAddToCart(product._id)} className="modal-button">
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
