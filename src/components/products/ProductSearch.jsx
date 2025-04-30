import { Input, InputGroup,InputRightElement, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

export const ProductSearch = ({ onSearch }) => (
  <InputGroup flex="1">
    <Input
      placeholder="Buscar productos..."
      onChange={(e) => onSearch(e.target.value)} // Llama a la función de búsqueda cuando el texto cambia
    />
    <InputRightElement>
      <LuSearch size={20} />
    </InputRightElement>

  </InputGroup>
);
