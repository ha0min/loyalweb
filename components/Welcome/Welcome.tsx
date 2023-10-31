import { Title, Text, Anchor, Image, Flex, Container, Box } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
    return (
        <Box pb={80}>
            <Title className={classes.title} ta="center" pt={200}>

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
            <Flex
                align="center"
                justify="center"
                gap="md"

            >
                <Title order={1} ta="center">
                    Let's Celebrate Your Loyalty Together

                </Title>
                <Image
                    component="img"
                    src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.webp"
                    alt="party popper"
                    w={80}
                    h={80}
                />
            </Flex>
        </Box>
    );
}
