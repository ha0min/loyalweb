'use client';

import { Button, Center, Container, Paper, rem } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { Welcome } from '../components/Welcome/Welcome';
import Footer from '@/components/Footer/Footer';
import { FeaturesCards } from '@/components/FeatureCards';
import { userAtom } from '@/store/userStore';

const WelcomePage = () => {
    const user = useAtomValue(userAtom);

    useEffect(() => {
        console.log(user);
    }, []);

    return (
        <Container p="md">
            <Welcome />
            <Center mb={rem('70px')}>
                <Button
                    rightSection={<IconArrowRight size={30} />}
                    component={Link}
                    href="/start"
                    size="xl"
                    radius="xl"
                    variant="primary"
                >
                    Get Started
                </Button>
                <Button
                    component={Link}
                    mx="md"
                    href="/user"
                    rightSection={<IconArrowRight size={30} />}
                    size="xl"
                    radius="xl"
                >
                    Continue as Guest
                </Button>
            </Center>
            <Paper shadow="md" radius="md" p="md">
                <FeaturesCards />
            </Paper>

        </Container>
    );
};

export default function Page() {
    return (
        <>
            <WelcomePage />
            <Footer />
        </>
    );
}
