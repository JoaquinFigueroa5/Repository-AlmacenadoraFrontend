import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Stack
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useProductUtils } from "../../shared/hooks/useProductUtils";
import { getProducts, saveProducts, updateProducts } from "../../services";
import toast from "react-hot-toast";
import "../../pages/products/ProductPage.css";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toISOString().split("T")[0]; 
};

export const ProductFormModal = ({ isOpen, onClose, productToEdit, onProductSaved }) => {
  const { categories, providers } = useProductUtils();

  const [form, setForm] = useState({
    name: "",            
    description: "",     
    price: "",           
    stock: "",           
    categoryId: "",      
    providerId: "",      
    entryDate: "",       
    image: ""            
  });

  useEffect(() => {
    if (productToEdit) {
      const categoryFound = categories.find(cat => cat.name === productToEdit.category);
      const providerFound = providers.find(prov => prov.name === productToEdit.provider);

      setForm({
        name: String(productToEdit.name) || "", 
        description: String(productToEdit.description) || "", 
        price: String(productToEdit.price?.$numberDecimal) || "", 
        stock: String(productToEdit.stock) || "", 
        categoryId: categoryFound?._id || "", 
        providerId: providerFound?._id || "", 
        entryDate: productToEdit.entryDate ? formatDate(productToEdit.entryDate) : "", 
        image: String(productToEdit.image) || "" 
      });
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        providerId: "",
        entryDate: "",
        image: ""
      });
    }
  }, [productToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.categoryId || !form.providerId) {
      return toast.error("Debe seleccionar una categoría y un proveedor");
    }

    let res;
    if (productToEdit) {
      res = await updateProducts(productToEdit._id, form);
    } else {
      res = await saveProducts(form);
    }

    if (res?.error) {
      return toast.error("Error al guardar producto");
    }

    toast.success(productToEdit ? "Producto actualizado correctamente" : "Producto guardado correctamente");
    onClose();
    onProductSaved(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent className="modal-form">
        <ModalHeader>{productToEdit ? "Editar Producto" : "Registrar Nuevo Producto"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input name="name" value={form.name} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Descripción</FormLabel>
              <Input name="description" value={form.description} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Precio</FormLabel>
              <Input type="number" name="price" value={form.price} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Stock</FormLabel>
              <Input type="number" name="stock" value={form.stock} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Categoría</FormLabel>
              <Select name="categoryId" value={form.categoryId} onChange={handleChange}>
                <option value="">Seleccione una categoría</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Proveedor</FormLabel>
              <Select name="providerId" value={form.providerId} onChange={handleChange}>
                <option value="">Seleccione un proveedor</option>
                {providers.map((prov) => (
                  <option key={prov._id} value={prov._id}>{prov.name}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Fecha de Ingreso</FormLabel>
              <Input
                type="date"
                name="entryDate"
                value={form.entryDate}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Imagen (URL)</FormLabel>
              <Input name="image" value={form.image} onChange={handleChange} />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {productToEdit ? "Editar" : "Guardar"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
