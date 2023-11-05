import { Title, Text, Anchor, Image, Flex, Container, Box, rem } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
    return (
        <Box pb={80}>

            <Flex
                align="center"
                justify="center"
                gap="md"
                pt={200}
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
                Let's Celebrate Your Loyalty Together

            </Text>
        </Box>
    );
}
