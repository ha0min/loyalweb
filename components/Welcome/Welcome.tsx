import { Title, Text, Anchor, Image, Flex, Container, Box, rem, Stack } from '@mantine/core';
import classes from './Welcome.module.css';
import { Logo } from '@/components/Logo/Logo';

export function Welcome() {
    return (
        <Box pt={200} pb={80}>
            <Stack
                justify="center"
                align="center"
                gap="md"
            >
                <Logo size={120} />
            <Flex
                align="center"
                justify="center"
                gap="md"
            >
                <Title className={classes.title} ta="center">

                    Welcome to{' '}
                    <Text
                        inherit
                        variant="gradient"
                        component="span"
                        gradient={{
                            from: 'pink',
                            to: 'purple',
                        }}
                    >
                        Fanly
                    </Text>
                </Title>

                <Image
                    component="img"
                    src="https://em-content.zobj.net/source/telegram/358/hugging-face_1f917.webp"
                    alt="party popper"
                    w={80}
                    h={80}
                />
            </Flex>
            <Text fw={500} size={rem('50px')} ta="center">
                Let&lsquo;s Celebrate Your Loyalty Together

            </Text>
            </Stack>
        </Box>
    );
}
