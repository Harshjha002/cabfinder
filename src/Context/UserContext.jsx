/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

// Create UserContext
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Start a new session (Login)
    const login = (userData) => {
        const userDetails = {
            id: userData.userId,  // Assuming userId is returned from API
            name: userData.name,
            email: userData.email,
            contactNo: userData.contactNo,
            token: userData.token, // If your API provides a token
        };
        setUser(userDetails);
        localStorage.setItem("user", JSON.stringify(userDetails));
    };

    // End session (Logout)
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // Ensure user data is reloaded on page refresh
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

// Custom Hook for accessing UserContext
export const useUser = () => useContext(UserContext);
