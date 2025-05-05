import { useEffect, useState } from "react";
import { useProviders } from "../../shared/hooks/useProviders";
import ProvidersTable from "./ProvidersTable";
import { ProviderFormModel } from "./ProviderFormModal";
import NavBar from "../NavBar";
import { useDisclosure, Button } from "@chakra-ui/react";

const ProvidersPage = () => {
    const { getProviders, providers, isFetching, deleteProvider } = useProviders();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [providerToEdit, setProviderToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProviders, setFilteresProviders] = useState([]);

    useEffect(() => {
        getProviders();
    }, [])

    useEffect(() => {
        if (searchTerm) {
            setFilteresProviders(
                providers.filter(provider => provider.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        } else {
            setFilteresProviders(providers || [])
        }
    }, [searchTerm, providers]);

    const handleOpenAddModal = () => {
        setProviderToEdit(null),
        onOpen();
    };

    const handleEditProvider = (provider) => {
        setProviderToEdit(provider);
        onOpen();
    }

    const handleSearch = (term) => {
        setSearchTerm(term)
    }

    const handleDeleteProvider = (provider) => {
        setProviderToEdit(provider);
        onOpen;
    }

    return (
        <>
            <NavBar />
            <ProvidersTable
                provider={filteredProviders}
                handleEditProvider={handleEditProvider}
                handleDeleteProvider={deleteProvider}
                onClickAdd={handleOpenAddModal}                
            />
            
            <ProviderFormModel
                isOpen={isOpen}
                onClose={() => {
                    setProviderToEdit(null);
                    onClose();
                }}
                providerToEdit={isOpen && providerToEdit ? providerToEdit : null}
                onProviderSaved={getProviders}
                handleDeleteProvider={handleDeleteProvider}
            />
        </>
    )
}

export default ProvidersPage;