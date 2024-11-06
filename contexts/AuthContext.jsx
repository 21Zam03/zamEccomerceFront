"use client";

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        try {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error('Error al guardar los datos del usuario:', error);
        }
    };

    const getUser = () => {
        try {
            const usuario = JSON.parse(localStorage.getItem('user'));
            return usuario != null ? usuario : null;
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
            return null;
        }
    };

    const logout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_SIGN_OUT_ENDPOINT}`, {
                method: 'POST',
                credentials: 'include', 
            });
    
            if (!response.ok) {
                throw new Error('Error al cerrar sesión');
            }

            localStorage.removeItem('user');
            setUser(null);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};