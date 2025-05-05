import { useState, useEffect } from "react";
import { useProvidersUtils } from "../../shared/hooks";
import { saveProviders, updateProviders } from "../../services";
import { useProviders } from "../../shared/hooks";
import toast from "react-hot-toast";
import { ProductFormModal } from "../products/ProductFormModal";
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

export const ProviderFormModel = ({ isOpen, onClose, providerToEdit, handleDeleteProvider, onProviderSaved }) => {
    const { products, refetchProducts } = useProvidersUtils();
    const { deleteProvider } = useProviders();
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);



    const [form, setForm] = useState({
        name: '',
        phone: '',
        products: ['']
    });

    useEffect(() => {
        if (!isOpen) return;

        if (providerToEdit) {
            let productsArray = [];

            if (Array.isArray(providerToEdit.products)) {
                productsArray = providerToEdit.products.map(p => p._id || p);
            } else if (typeof providerToEdit.products === 'string') {
                productsArray = [providerToEdit.products];
            }

            setForm({
                name: providerToEdit.name ?? '',
                phone: providerToEdit.phone ?? '',
                products: [...productsArray, '']
            });
        } else {
            setForm({
                name: '',
                phone: '',
                products: ['']
            });
        }
    }, [providerToEdit, isOpen]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const cleanedProducts = form.products.filter(p => p !== '');

        if (!form.name || !form.phone || cleanedProducts.length === 0) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        const cleanForm = {
            ...form,
            products: cleanedProducts
        };

        let res;
        if (providerToEdit) {
            res = await updateProviders(providerToEdit._id, cleanForm);
        } else {
            res = await saveProviders(cleanForm);
        }

        if (res?.error) {
            console.error(res.e);
            return toast.error('Error al guardar al proveedor');
        }

        toast.success(providerToEdit ? 'Proveedor actualizado con éxito!' : 'Proveedor guardado con éxito!');
        onClose();
        onProviderSaved();
    };

    const handleDelete = async () => {
        if (!providerToEdit || !providerToEdit._id) {
            toast.error("No se puede eliminar: proveedor no válido.");
            return;
        }

        try {
            const res = await deleteProvider(providerToEdit._id);
            if (res?.error) {
                throw new Error(res.error);
            }

            onClose();
            onProviderSaved();
        } catch (error) {
            console.error(error);
        }
    };


    const handleProductChange = (index, value) => {
        const updatedProducts = [...form.products];
        const isDuplicate = form.products.some((p, i) => i !== index && p === value);
        if (isDuplicate) {
            toast.error("Este producto ya ha sido seleccionado");
            return;
        }
        updatedProducts[index] = value;
        setForm(prev => ({ ...prev, products: updatedProducts }));

        if (index === form.products.length - 1 && value !== '') {
            setForm(prev => ({ ...prev, products: [...updatedProducts, ''] }));
        }
    };

    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent className="modal-form">
                    <ModalHeader>{providerToEdit ? "Editar Proveedor" : "Registrar Nuevo Proveedor"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Nombre</FormLabel>
                                <Input name="name" value={form.name} onChange={handleChange} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Telefono</FormLabel>
                                <Input name="phone" value={form.phone} onChange={handleChange} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Productos</FormLabel>
                                {form.products.map((prod, idx) => (
                                    <Select
                                        key={idx}
                                        placeholder="Seleccione un producto"
                                        value={prod}
                                        onChange={(e) => handleProductChange(idx, e.target.value)}
                                        mt={idx > 0 ? 2 : 0}
                                    >
                                        {products.map((p) => (
                                            <option key={p._id} value={p._id}>{p.name}</option>
                                        ))}
                                    </Select>
                                ))}
                            </FormControl>

                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="green" mr={20} onClick={() => setIsProductModalOpen(true) }  >
                            Agregar Productos
                        </Button>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            {providerToEdit ? "Editar" : "Guardar"}
                        </Button>
                        <Button colorScheme='red' mr={3} onClick={() => setIsDeleteConfirmOpen(true)} >
                            Delete
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
                <Modal isOpen={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Confirmar eliminación</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            ¿Estás seguro de que deseas eliminar este proveedor?
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="red" onClick={async () => {
                                await handleDelete();
                                setIsDeleteConfirmOpen(false);
                            }}>
                                Sí, eliminar
                            </Button>
                            <Button variant="ghost" onClick={() => setIsDeleteConfirmOpen(false)}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Modal>
            <ProductFormModal
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                productToEdit={null}
                onProductSaved={() => {
                    setIsProductModalOpen(false);
                    refetchProducts();
                    
                }}
            />

        </>

    )

}