import { useNavigate } from "react-router";
import { UsersCards } from "./UsersCards";
import { SimpleGrid } from "@chakra-ui/react";

export const Users = ({ users }) => {
    const navigate = useNavigate();

    const handleNavigateToUser = (id) => {
        navigate(`/users/${id}`)
    }

    return (
        <>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} p={6} >
                {users.map((c) => (
                    <UsersCards
                        key={c.id}
                        id={c.id}
                        name={c.name}
                        surname={c.surname}
                        username={c.username}
                        email={c.email}
                        phone={c.phone}
                        role={c.role}
                        navigateToUserHandler={handleNavigateToUser}
                    />
                ))}
            </SimpleGrid>

        </>
    )
}