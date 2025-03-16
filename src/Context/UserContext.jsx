/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        const userDetails = {
            id: userData.userId,
            name: userData.name,
            email: userData.email,
            contactNo: userData.contactNo,
            token: userData.token,
            isOwner: userData.isOwner, // Ensure backend sends this
        };
        setUser(userDetails);
        localStorage.setItem("user", JSON.stringify(userDetails));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
