import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Anchor, Button, Checkbox, Group, Paper, PasswordInput, TextInput } from '@mantine/core';
import {IconAt, IconEmpathize, IconLock, IconUser} from '@tabler/icons-react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { notification } from 'antd';
import { useLogin, useRegister } from '@/api/user';
import { userAtom } from '@/store/userStore';

export interface AuthenticationFormProps {
    noShadow?: boolean;
    noPadding?: boolean;
    noSubmit?: boolean;
    style?: React.CSSProperties;
}

export default function AuthenticationForm({
                                               noShadow,
                                               noPadding,
                                               noSubmit,
                                               style,
                                           }: AuthenticationFormProps) {
    const [formType, setFormType] =
        useState<'register' | 'login'>('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>(null);

    const {
        login,
        loginUser,
        loginError,
    } = useLogin();
    const {
        register,
        error: registerError,
        registerUser,
    } = useRegister();
    const [user, setUser] = useAtom(userAtom);
    const router = useRouter();

    const toggleFormType = () => {
        setFormType((current) => (current === 'register' ? 'login' : 'register'));
        setError(null);
    };

    const form =
        useForm({
        initialValues: {
            nickname: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            termsOfService: true,
        },
        validate: (values) => {
            if (formType === 'register') {
                if (values.password !== values.confirmPassword) {
                    return {
                        confirmPassword: 'Passwords do not match',
                    };
                }
                if (!values.termsOfService) {
                    return {
                        termsOfService: 'You must agree to the terms of service',
                    };
                }
            }
            if (formType === 'login') {
                if (!values.username) {
                    return {
                        username: 'Username is required',
                    };
                }
                if (!values.password) {
                    return {
                        password: 'Password is required',
                    };
                }
            }
            return {};
        },
    });

    const handleLogin = async () => {
        console.log('login! login form.values', form.values)
        setLoading(true);
        await login(form.values.username, form.values.password);
    };

    const handleRegister = async () => {
        console.log('register! register form.values', form.values);
        setLoading(true);
        await register(form.values.username,
            form.values.nickname,
            form.values.password,
            form.values.confirmPassword,
            form.values.email);
    };

    const onSubmit = formType === 'register' ? handleRegister : handleLogin;

    useEffect(() => {
        if (loginError) {
            setLoading(false);
            console.log('useEffect error log', loginError);
            notification.error({
                message: 'Login failed',
                description: `loginError.message ${loginError}`,
            });
        }
        if (registerError) {
            setLoading(false);
            console.log('useEffect error log', registerError);
            notification.error({
                message: 'Registration failed',
                description: `registerError.message ${registerError}`,
            });
        }
    }, [loginError, registerError]);

    useEffect(() => {
        setLoading(false);
        // Redirect based on user role or after successful registration/login
        if (user?.userRole) {
            notification.info(
                {
                    message: 'Welcome back!',
                    description: `Welcome ${user.username}`,
                }
            );
            if (user.userRole === 'user') {
                router.push('/user');
            } else {
                router.push('/admin');
            }
        } else if (loginUser) {
            setUser(loginUser);
            notification.success({
                message: 'Success',
                description: 'You have successfully logged in',
            });
            console.log('useEffect user log', user);
        } else if (registerUser) {
            setUser(registerUser);
            notification.success({
                message: 'Success',
                description: 'Welcome to the community, you will be redirected shortly',
            });
        }
    }, [user, registerUser, loginUser, router]);

    return (
        <Paper
            p={noPadding ? 0 : 'lg'}
            shadow={noShadow ? 'none' : 'sm'}
            style={{
                ...style,
                position: 'relative',
            }}
            withBorder
            radius="md"
        >

            <form onSubmit={form.onSubmit(onSubmit)}>
                {formType === 'register' && (
                    <TextInput
                        data-autofocus
                        required
                        placeholder="Your Nickname"
                        label="Nickname"
                        leftSection={<IconEmpathize size={16} stroke={1.5} />}
                        {...form.getInputProps('nickname')}
                    />

                )}

                {formType === 'register' && (
                    <TextInput
                        data-autofocus
                        required
                        placeholder="Your Email"
                        label="Email"
                        mt="md"
                        leftSection={<IconAt size={16} stroke={1.5} />}
                        {...form.getInputProps('email')}
                    />

                )}

                <TextInput
                    mt="md"
                    required
                    placeholder="Account"
                    label="Account"
                    leftSection={<IconUser size={16} stroke={1.5} />}
                    {...form.getInputProps('username')}
                />

                <PasswordInput
                    mt="md"
                    required
                    placeholder="Password"
                    label="Password"
                    leftSection={<IconLock size={16} stroke={1.5} />}
                    {...form.getInputProps('password')}
                />

                {formType === 'register' && (
                    <PasswordInput
                        mt="md"
                        required
                        label="Confirm Password"
                        placeholder="Confirm password"
                        leftSection={<IconLock size={16} stroke={1.5} />}
                        {...form.getInputProps('confirmPassword')}
                    />
                )}

                {formType === 'register' && (
                    <Checkbox
                        mt="xl"
                        label="I agree to sell my soul and privacy to this corporation"
                        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                    />
                )}

                {!noSubmit && (
                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" c="dimmed" onClick={toggleFormType} size="sm">
                            {formType === 'register'
                                ? 'Have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>

                        <Button type="submit" loading={loading}>
                            {formType === 'register' ? 'Register' : 'Login'}
                        </Button>
                    </Group>
                )}
            </form>
        </Paper>
    );
}
