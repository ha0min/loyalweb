import { Button, Image, Loader, Paper, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { IconPigMoney } from '@tabler/icons-react';

export const PaymentMimic = () => {
    const [isPayed, setIsPayed] = useState(false);
    const [isPaying, setIsPaying] = useState(false);
    return (
        <Paper w="100%" shadow="xs" radius="lg" withBorder p="md">
            <Stack align="center" my="xl">
                {isPayed ? (
                    <Stack
                        align="center"
                    >
                        <Image
                            src="https://em-content.zobj.net/source/telegram/358/sign-of-the-horns_1f918.webp"
                            alt="rock"
                            w={80}
                            h={80}
                        />
                        <Text fw={500} size="xl">
                            Payment Successful!
                        </Text>
                    </Stack>
                ) : (
                    <Stack
                        justify="center"
                        align="center"
                    >
                        {isPaying ?
                            (<Stack align="center">
                                <Loader size={50} />
                                <Text fw={500} size="xl">
                                    Mimic Payment here...
                                </Text>
                             </Stack>)
                            :
                            (<IconPigMoney size={80} />)}

                <Button
                    onClick={() => {
                        setIsPaying(true);
                        setTimeout(() => {
                            setIsPayed(true);
                            setIsPaying(false);
                        }, 3000);
                    }}
                    variant="light"
                    radius="xl"
                    loading={isPaying}
                    size="lg"
                >
                    Pay
                </Button>
                    </Stack>
            )
            }
            </Stack>
        </Paper>
);
};
