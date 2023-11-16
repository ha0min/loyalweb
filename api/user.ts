import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { User } from '@/type';
import { fetcher } from '@/api/common';

export const useRegister = () => {
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [error, setError] = useState<Error>(null);
    const [userSession, setUserSession] = useState<User>(null);

    const register = async (account, password, checkPassword, email) => {
        setIsRegisterLoading(true);
        setError(null);
        // register params log
        console.log('register params', account, password, checkPassword, email);

        try {
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ account, password, checkPassword, email }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('register data', data);

            if (data.code !== 0) {
                console.log('register error', data.message);
                throw new Error(data.message || 'API error without a message.');
            }

            setUserSession(data.data);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsRegisterLoading(false);
        }
    };

    return { register, isRegisterLoading, error, registerUser: userSession };
};

export const useLogin = () => {
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState<Error>(null);
    const [userSession, setUserSession] = useState<User>(null);

    const login = async (account: string, password: string) => {
        setIsLoginLoading(true);
        setLoginError(null);

        // login params log
        console.log('login params', account, password);

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ account, password }),
            });

            if (!response.ok) {
                console.log('login error', response);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('login data', data);

            if (data.code !== 0) {
                console.log('login error', data.message);
                throw new Error(data.message || 'API error without a message.');
            }

            setUserSession(data.data);
        } catch (e) {
            setLoginError(e.message);
        } finally {
            setIsLoginLoading(false);
        }
    };

    return { login, isLoginLoading, loginError, loginUser: userSession };
};

export const useCurrentUser = () => {
    const key = JSON.stringify(['/api/user/get/login']);
    const { data, error } = useSWR<User, Error>(
        key,
        () => fetcher<User>('/api/user/get/login',
            'GET',
            null),
    );

    return {
        currentUser: data,
        isCurrentUserLoading: !error && !data,
        currentError: error,
        isAdmin: data?.userRole !== 'user',
    };

    //TODO: remove mock
    // const [currentUser, setCurrentUser] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    //
    // useEffect(() => {
    //     const mockUser = {
    //         id: 1,
    //         avatar: 'https://i.pravatar.cc/300',
    //         username: 'mock',
    //         email: 'abc@fanly.dev',
    //         userRole: 'user',
    //         points: 60,
    //     };
    //
    //     const timeoutId = setTimeout(() => {
    //         setCurrentUser(mockUser);
    //         setIsLoading(false);
    //     }, 1000);
    //
    //     return () => clearTimeout(timeoutId);
    // }, []);
    //
    // return {
    //     currentUser,
    //     isCurrentUserLoading: isLoading, //!error && !data,
    //     currentError: null, //error,
    //     isAdmin: false, //data?.userRole !== 'user',
    // };
};

export const useLogout = () => {
    // post /user/logout with no params
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);
    const [logoutError, setLogoutError] = useState<Error>(null);

    const logout = async () => {
        setIsLogoutLoading(true);
        setLogoutError(null);

        try {
            const response = await fetch('/api/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                console.log('logout error', response);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('logout data', data);

            if (data.code !== 0) {
                console.log('logout error', data.message);
                throw new Error(data.message || 'API error without a message.');
            }
        } catch (e) {
            setLogoutError(e.message);
        } finally {
            setIsLogoutLoading(false);
        }
    };

    return { logout, isLogoutLoading, logoutError };
};
