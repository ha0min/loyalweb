'use client';

import { Button, Container, Group, TextInput } from '@mantine/core';
import {notification, Result, Skeleton} from 'antd';
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useCurrentUser, useUpdateUser } from '@/api/user';
import { PageTitle } from '@/components/PageTitle/PageTitle';

const Page = () => {
    const {
        isCurrentUserLoading,
        currentUser,
        currentError,
    } = useCurrentUser();

    const {
        update,
        isUpdateLoading,
        updateError,
    } = useUpdateUser();

    const form = useForm(
        {
            initialValues: {
                username: currentUser.username || '',
                email: currentUser.email || '',
                avatar: currentUser.avatar || '',
                phone: currentUser.phone || '',
                profile: currentUser.profile || '',
            },
            validate: {
                username: (value) => value.trim().length > 0 ? null : 'Nickname is required',
                email: (value) => value.trim().length > 0 ? null : 'Email is required',
                avatar: (value) => value.trim().length > 0 ? null : 'Avatar is required',
            },
        }
    );

    useEffect(() => {
        if (currentUser) {
            console.log('fetch current user', currentUser);
            form.setInitialValues({
                username: currentUser.username,
                email: currentUser.email,
                avatar: currentUser.avatar,
                phone: currentUser.phone,
                profile: currentUser.profile,
            });

            form.setValues({
                username: currentUser.username,
                email: currentUser.email,
                avatar: currentUser.avatar,
                phone: currentUser.phone,
                profile: currentUser.profile,
            });
        }
    }, [currentUser]);

    if (isCurrentUserLoading) {
        return (
            <Container p="md">
                <Skeleton active />
            </Container>
        );
    }

    if (currentError || updateError) {
        return (
            <Container p="md">
                <Result
                    status="error"
                    title="Something went wrong"
                    subTitle={`Please try again later. ${currentError}`}
                />
            </Container>
        );
    }

    return (
        <div>
            <Container
                p="md"
            >
                <PageTitle
                    title="Profile"
                    subtitle="Manage your profile"
                    url="https://em-content.zobj.net/source/telegram/358/waving-hand_1f44b.webp"
                />

                <form
                    onSubmit={form.onSubmit((values) => {
                        console.log('submit values: ', values);
                        update(values).then(() => {
                            console.log('update success');
                            notification.success({
                                message: 'Update Profile Success!',
                            });
                        });
                    })}
                >
                    <TextInput label="Nickname" placeholder="Nickname" {...form.getInputProps('username')} />
                    <TextInput label="Email" placeholder="Email" {...form.getInputProps('email')} />
                    <TextInput label="Avatar" placeholder="Avatar" {...form.getInputProps('avatar')} />
                    <TextInput label="Phone" placeholder="Phone" {...form.getInputProps('phone')} />
                    <TextInput label="Profile" placeholder="Profile" {...form.getInputProps('profile')} />

                    <Group justify="center" mt="xl">
                        <Button variant="outline" type="submit" loading={isUpdateLoading}>
                            Submit
                        </Button>
                        <Button variant="outline" onClick={() => form.reset()} loading={isUpdateLoading}>
                            Reset
                        </Button>
                    </Group>
                </form>
            </Container>
        </div>
    );
};

export default Page;
