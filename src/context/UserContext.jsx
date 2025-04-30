import { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUser = useCallback(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;
        console.log(token)
        if (!token) {
            setUser(null);
            return;
        }

        axios.get('http://127.0.0.1:3000/almacenadora/v1/users/profile', {
            headers: { 'x-token': token }
        })
            .then(res => {
                setUser(res.data.user);
            })
            .catch(err => {
                console.error('Error al cargar el usuario:', err);
                setUser(null);
            });
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <UserContext.Provider value={{ user, refreshUser: fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};
