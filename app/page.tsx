'use client';

import { Button, Center, Modal, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowRight } from '@tabler/icons-react';
import { Welcome } from '../components/Welcome/Welcome';
import AuthenticationForm from '@/components/AuthenticationForm/AuthenticationForm';
import Footer from '@/components/Footer/Footer';

const WelcomePage = () => {
    const [opened, {
        open,
        close,
    }] = useDisclosure(false);

    return (
        <div>
            <Welcome />
            <Center>
                <Button rightSection={<IconArrowRight size={30} />} onClick={open} size="xl" radius="xl" mb={rem('50px')} variant="primary">
                    Get Started
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
            <Footer />
        </div>
    );
};

export default function Page() {
    return (
        <>
            <WelcomePage />
        </>
    );
}
