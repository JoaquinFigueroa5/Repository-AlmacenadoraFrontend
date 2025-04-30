import { Route, Routes } from "react-router-dom";
import { Users } from "../users/Users";

export const Content = ({ users, getUsers}) => {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Users users={users} /> } />
            </Routes>
        </>
    )
}