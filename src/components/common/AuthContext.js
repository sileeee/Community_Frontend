import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [name, setName] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const checkSession = async () => {
        try {
            const response = await axios.get("https://localhost:8443/auth/session", {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        setName(response.data.data.name);
        setIsLoggedIn(response.data.data.loggedIn);
        setUserRole(response.data.data.role);
        } catch (error) {
            console.error("Error checking session:", error);
            setName(null);
            setIsLoggedIn(false);
            setUserRole(null);
        }
    };

    const logout = async () => {
        try {
            await axios.get("https://localhost:8443/users/logout", { withCredentials: true });
            setName(null);
            setIsLoggedIn(false);
            setUserRole(null);
            alert("Logged out successfully");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, name, checkSession, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
