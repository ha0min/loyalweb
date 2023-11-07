'use client';

import { Button, Center, Container, Modal, Paper, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { Welcome } from '../components/Welcome/Welcome';
import AuthenticationForm from '@/components/AuthenticationForm/AuthenticationForm';
import Footer from '@/components/Footer/Footer';
import { FeaturesCards } from '@/components/FeatureCards';

const WelcomePage = () => {
    const [opened, {
        open,
        close,
    }] = useDisclosure(false);

    return (
        <Container p="md">
            <Welcome />
            <Center mb={rem('70px')}>
                <Button rightSection={<IconArrowRight size={30} />} onClick={open} size="xl" radius="xl" variant="primary">
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
            <Modal
                transitionProps={{ transition: 'pop' }}
                opened={opened}
                onClose={close}
                centered
                overlayProps={{
                    blur: 3,
                    backgroundOpacity: 0.3,
                    color: 'white',
                }}
            >
                <AuthenticationForm noPadding noShadow />
            </Modal>
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
