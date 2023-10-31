'use client';

import { Button, Center, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Welcome } from '../components/Welcome/Welcome';
import AuthenticationForm from '@/components/AuthenticationForm/AuthenticationForm';

const WelcomePage = () => {
    const [opened, {
        open,
        close,
    }] = useDisclosure(false);

    return (
        <div>
            <Welcome />
            <Center>
                <Button onClick={open} radius="xl" variant="outline">
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
