import useSWR from 'swr';
import { useState } from 'react';
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
};
