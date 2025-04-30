import { useEffect } from "react";
import NavBar from "./NavBar";
import { Content } from "./dashboard/Content";
import { useUsers } from "../shared/hooks/useUsers";
import { useUserDetails } from "../shared/hooks/useUserDetails";
import Loading from "./Loading";

const ViewUsers = () => {
    const { getUsers, allUsers, isFetching } = useUsers();
    const { isLogged } = useUserDetails();

    useEffect(() => {
        getUsers(isLogged)
    }, [])

    if(isFetching){
        return <Loading />
    }

    return (
        <>
            <NavBar />
            <Content users={allUsers} getUsers={getUsers} />
        </>
    )
}

export default ViewUsers;