import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [name, setName] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const checkSession = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/session`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        setName(response.data.data.name);
        setIsLoggedIn(response.data.data.loggedIn);
        setUserRole(response.data.data.role);
        setUserId(response.data.data.userId);
        } catch (error) {
            console.error("Error checking session:", error);
            setName(null);
            setIsLoggedIn(false);
            setUserRole(null);
            setUserId(null);
        }
    };

    const logout = async () => {
        try {
            await axios.get(`${API_BASE_URL}/users/logout`, { withCredentials: true });
            setName(null);
            setIsLoggedIn(false);
            setUserRole(null);
            setUserId(null);
            window.confirm("로그아웃 되었습니다.");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, name, userId, checkSession, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
