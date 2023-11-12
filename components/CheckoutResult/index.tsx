import { Result } from 'antd';
import { ActionIcon, Button, Flex, Image, Text } from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';

export type CheckoutResultProps = {
    success: boolean;
    message?: string;
    pointsEarned?: number;
    currentPoints?: number;
    onClick: () => void;
};

export const CheckoutResult = (props: CheckoutResultProps) => (
    <Result
        status={props.success ? 'success' : 'error'}
        icon={props.success ?
            <Flex
                align="center"
                justify="center"
            >
                <Image
                    src="https://em-content.zobj.net/source/telegram/358/party-popper_1f389.webp"
                    alt="party-popper"
                    w={120}
                    h={120}
                    style={{ alignItems: 'center' }}
                />
            </Flex>
            :
            <Flex
                align="center"
                justify="center"
            >
                <Image
                    src="https://em-content.zobj.net/source/telegram/358/smiling-face-with-tear_1f972.webp"
                    alt="sad-face"
                    w={120}
                    h={120}
                />
            </Flex>
        }
        title={props.success ? 'Thank you for your order!' : 'Failed to submit the order'}
        subTitle={props.success ? (
                <div key="success-subtitle">
                    <Flex
                        align="center"
                        justify="center"
                    >
                        <ActionIcon
                            variant="transparent"
                            aria-label="Gradient action icon"
                            gradient={{
                                from: 'blue',
                                to: 'grape',
                                deg: 165,
                            }}
                        >

                            <IconSparkles
                                stroke={1.5}
                            />
                        </ActionIcon>

                        <Text
                            c="dimmed"
                            gradient={{
                                from: 'blue',
                                to: 'grape',
                                deg: 165,
                            }}
                            variant="gradient"
                        >
                            Earning points: {props.pointsEarned},
                            you have {props.currentPoints} points now.
                        </Text>

                    </Flex>
                </div>

            ) :
            props.message
        }
        extra={
            [
                <Button onClick={props.onClick} size="lg" variant="light">
                    {props.success ? 'Check your order' : 'Try again'}
                </Button>,
            ]
        }
    />
);
