import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { Anchor, Text, Button, Checkbox, Group, LoadingOverlay, Paper, PasswordInput, TextInput } from '@mantine/core';
import { IconAt, IconLock, IconUser } from '@tabler/icons-react';

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
    const [formType, setFormType] = useState<'register' | 'login'>('register');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleFormType = () => {
        setFormType((current) => (current === 'register' ? 'login' : 'register'));
        setError(null);
    };

    const form = useForm({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            termsOfService: true,
        },
    });

    const handleSubmit = () => {
        // TODO: Handle form submission
        setLoading(true);
        setError(null);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    return (
        <Paper
            p={noPadding ? 0 : 'lg'}
            shadow={noShadow ? 'none' : 'sm'}
            style={{
                ...style,
                position: 'relative',
                backgroundColor: 'var(--mantine-color-body)',
            }}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <LoadingOverlay visible={loading} />
                {formType === 'register' && (
                        <TextInput
                            data-autofocus
                            required
                            placeholder="Username"
                            label="Username"
                            leftSection={<IconUser size={16} stroke={1.5} />}
                            {...form.getInputProps('username')}
                        />

                )}

                <TextInput
                    mt="md"
                    required
                    placeholder="Your email"
                    label="Email"
                    leftSection={<IconAt size={16} stroke={1.5} />}
                    {...form.getInputProps('email')}
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

                {error && (
                    <Text c="red" size="sm" mt="sm">
                        {error}
                    </Text>
                )}

                {!noSubmit && (
                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" c="dimmed" onClick={toggleFormType} size="sm">
                            {formType === 'register'
                                ? 'Have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>

                        <Button color="blue" type="submit">
                            {formType === 'register' ? 'Register' : 'Login'}
                        </Button>
                    </Group>
                )}
            </form>
        </Paper>
    );
}
