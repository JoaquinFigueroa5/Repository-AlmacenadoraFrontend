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
    category: "",
    provider: "",
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
        price: String(productToEdit.price?.$numberDecimal ?? productToEdit.price) || "",
        stock: String(productToEdit.stock) || "",
        category: categoryFound?._id || "",
        provider: providerFound?._id || "",
        entryDate: productToEdit.entryDate ? formatDate(productToEdit.entryDate) : "",
        image: String(productToEdit.image) || ""
      });
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        provider: "",
        entryDate: "",
        image: ""
      });
    }
  }, [productToEdit, isOpen, categories, providers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.category || !form.provider) {
      return toast.error("Debe seleccionar una categoría y un proveedor", {
        style: {
          background: 'red',
          color: 'white',
          whiteSpace: 'pre-line'
        }
      });
    }

    let res;
    if (productToEdit) {
      res = await updateProducts(productToEdit._id, form);
    } else {
      res = await saveProducts(form);
    }

    if (res?.error) {
      return toast.error("Error al guardar producto", {
        style: {
          background: 'red',
          color: 'white',
          whiteSpace: 'pre-line'
        }
      });
    }

    toast.success(productToEdit ? "Producto actualizado correctamente" : "Producto guardado correctamente", {
      style: {
        background: 'green',
        color: 'white'
      }
    });
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
              <Select name="category" value={form.category} onChange={handleChange}>
                <option value="">Seleccione una categoría</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Proveedor</FormLabel>
              <Select name="provider" value={form.provider} onChange={handleChange}>
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
