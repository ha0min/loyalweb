'use client';

import {
     Container, Center, Box, Grid,
} from '@mantine/core';
import Link from 'next/link';
import { Logo } from '@/components/Logo/Logo';
import AuthenticationForm from '@/components/AuthenticationForm/AuthenticationForm';
import './start.css';

const Page = () => (
        <Container
            p="md"
            className="background"
        >
            <Grid grow>
                <Grid.Col px={50} py={50} mb={80}>
                    <Link
                        href="/"
                    >
                        <Logo size={64} />
                    </Link>
                </Grid.Col>
                <Grid.Col>
                    <Box pos="relative">
                        <Container>
                            <Center>
                                <AuthenticationForm />
                            </Center>
                        </Container>
                    </Box>
                </Grid.Col>
            </Grid>
        </Container>);

export default Page;
