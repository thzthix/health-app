import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
            const verifyUser = async () => {
                try {
                    const response = await axios.get('http://localhost:3001/api/auth/verify-token', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setCurrentUser(response.data);
                } catch (error) {
                    console.log(error);
                    logout();
                } finally {
                    setLoading(false);
                }
            };

            verifyUser();
        } else {
          
            setLoading(false);
        }
    }, []);

    const login = (responseData) => {
        const { user, token } = responseData;
        console.log(user,token)
        localStorage.setItem('token', token);
        setCurrentUser(user);
        setAuthToken(token);
        setLoading(false); 
    
    };

    const logout = () => {
        setCurrentUser(null);
        setAuthToken(null);
        localStorage.removeItem('token');
        setLoading(false);
    
    };
    const register = async (user) => {
        try {
            const response = await fetch('http://localhost:3001/api/users/signup', { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            });
            const data = await response.json();
            if (response.status === 200) {
              login(data);
              localStorage.setItem('token', data.token); // 토큰 저장
            } else {
              throw new Error(data.message);
            }
          } catch (error) {
            console.error('회원가입 실패:', error);
          }
    };


    return (
        <AuthContext.Provider value={{ authToken, currentUser, login, logout, loading ,register}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
