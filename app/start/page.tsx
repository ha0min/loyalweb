'use client';

import { useState } from 'react';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Paper,
    Group,
    Button,
    Checkbox,
    Anchor,
    Stack, Container, Center, Title, Box, LoadingOverlay, Grid,
} from '@mantine/core';
import { Logo } from '@/components/Logo/Logo';

type FormProps = {
    setLoading: (loading: boolean) => void;
};

function AuthenticationForm(props: FormProps) {
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    return (
        <Paper radius="md" p="xl" withBorder shadow="lg">
            <Title order={3} fw={500} pb={10}>
                👋 Welcome to Fanly
            </Title>

            <form onSubmit={form.onSubmit(() => {
                props.setLoading(true);

                setTimeout(() => {
                    props.setLoading(false);
                }, 1000);
            })}
            >
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            label="Username"
                            placeholder="Your Username"
                            value={form.values.name}
                            required
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@fanly.dev"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />

                    {type === 'register' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    )}
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}

const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <Grid>
            <Grid.Col px={50} py={50} mb={80}>
                <Logo size={64} />
            </Grid.Col>
            <Grid.Col>
                <Box pos="relative">
                    <LoadingOverlay
                        visible={isSubmitting}
                        zIndex={1000}
                        overlayProps={{
                            radius: 'sm',
                            blur: 2,
                        }}
                    />

                    <Container>
                        <Center>
                            <AuthenticationForm setLoading={setIsSubmitting} />
                        </Center>
                    </Container>
                </Box>
            </Grid.Col>
        </Grid>);
};

export default Page;
