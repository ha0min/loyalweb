'use client';

import { useAtomValue } from 'jotai';
import {
    Title,
    Stack,
    ScrollArea,
    Flex,
    ActionIcon,
    Text,
    Button,
    Container,
    Paper,
    Grid, Image, Stepper, TextInput, Group, JsonInput,
} from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { List } from 'antd';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cartAtom, cartAtomType } from '@/store/cartStore';
import { SubmitOrderFormValues, useSubmitOrder } from '@/api/forms';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import { PaymentMimic } from '@/components/Payment';
import { CheckoutResult } from '@/components/CheckoutResult';
import { useClearCartAtom } from '@/store/cartStoreUtils';

const ItemContent = (props: { cartValue: cartAtomType }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        // If cartValue has items, it's not loading; otherwise, it is.
        const loading = props.cartValue.items.length === 0;
        setIsLoading(loading);
    }, [props.cartValue]);

    if (props.cartValue.items.length === 0) {
        return (
            <Stack justify="center" align="center">
                <Text fw={500} size="lg">
                Please add some items to your cart first.
                </Text>
                <Button
                    component={Link}
                    href="/user/shop"
                    variant="outline"
                >
                    Go to Shop
                </Button>
            </Stack>
        );
    }

    return (
        <div>
            <ScrollArea>
                <Stack gap="sm">
                    <List
                        itemLayout="horizontal"
                        loading={isLoading}
                        dataSource={props.cartValue?.items}
                        renderItem={(item) => (
                            <List.Item>
                                <Container w="100%" p="md">
                                    <Grid>
                                        <Grid.Col span={2}>
                                            <Image
                                                src={item.product.picture}
                                                alt={item.product.name}
                                                w={120}
                                                h={120}

                                            />
                                        </Grid.Col>
                                        <Grid.Col span={10}>
                                            <Stack ml="sm" justify="space-between" h="100%">
                                                <Text size="xl" fw={500}>{item.product.name}</Text>
                                                <Flex justify="space-between">
                                                    <Text size="lg" fw={500}>
                                                        {item.quantity} pcs
                                                    </Text>
                                                    <Text size="xl" fw={700}>
                                                        $ {item.product.price * item.quantity}
                                                    </Text>
                                                </Flex>
                                            </Stack>
                                        </Grid.Col>
                                    </Grid>
                                </Container>
                            </List.Item>
                        )}
                    />
                </Stack>
            </ScrollArea>
        </div>
    );
};

const CheckoutPage = () => {
    const [active, setActive] = useState(0);
    const cartValue = useAtomValue(cartAtom);
    const {
        submitOrder,
        orderResponse,
        error,
        isLoading,
    } = useSubmitOrder();
    const clearCart = useClearCartAtom();

    const transformedOrderDetails = cartValue.items.map(item => ({
        productId: item.product.id,
        number: item.quantity,
    }));

    const form = useForm<
        SubmitOrderFormValues
    >({
        initialValues: {
            orderDetailAddRequestList: [] as SubmitOrderFormValues['orderDetailAddRequestList'],
            remark: '',
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    orderDetailAddRequestList: values.orderDetailAddRequestList.length === 0
                        ? 'Please add at least one product' : null,
                };
            }

            if (active === 1) {
                return {
                    remark: values.remark.trim().length > 0 ? null : 'Please input the remark for the order',
                };
            }

            return {};
        },
    });

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 3 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const route = useRouter();

    useEffect(() => {
        form.setValues({
            orderDetailAddRequestList: transformedOrderDetails,
        });
    }, [cartValue]);

    const handleFormSubmit = async (formValues: SubmitOrderFormValues) => {
        await submitOrder(formValues);

        console.log('orderResponse', orderResponse);
    };

    useEffect(() => {
        if (orderResponse) {
            console.log(`Success submit order${orderResponse}`);
            clearCart();
        }
        if (error) {
            console.log('error', error);
        }
        nextStep();
    }, [orderResponse, error]);

    return (
        <Container p="md">
            <PageTitle
                title="Checkout"
                subtitle="Confirm order and earn reward points."
                url="https://em-content.zobj.net/source/telegram/358/smiling-cat-with-heart-eyes_1f63b.webp"
            />
            <Stepper my="md" active={active}>
                <Stepper.Step label="Confirm">
                    <Paper w="100%" shadow="xs" radius="lg" withBorder p="md">
                        <ItemContent cartValue={cartValue} />
                        <JsonInput
                            style={{ display: 'none' }}
                            name="orderDetailAddRequestList"
                            defaultValue={JSON.stringify(transformedOrderDetails)}
                            {...form.getInputProps('orderDetailAddRequestList')}
                        />
                    </Paper>
                </Stepper.Step>

                <Stepper.Step label="Address">
                    <Paper w="100%" shadow="xs" radius="lg" withBorder p="md">
                        <TextInput label="Remark" placeholder="Note for the order" {...form.getInputProps('remark')} />
                        <TextInput mt="md" label="Address" defaultValue="500 El Camino Real, Santa Clara, CA 95053" />
                    </Paper>
                </Stepper.Step>

                <Stepper.Step label="Payment">
                    <PaymentMimic />
                </Stepper.Step>

                <Stepper.Completed>

                    {orderResponse ? (
                        <CheckoutResult
                            success
                            pointsEarned={parseInt(orderResponse.data.pointsEarned, 10)}
                            currentPoints={parseInt(orderResponse.data.points, 10)}
                            onClick={() => {
                                console.log('result clicked');
                                route.push(`/user/orders/${orderResponse.data.id}`);
                            }
                        }
                        />
                    ) : (
                        <CheckoutResult
                            success={false}
                            message={error ? error.message : 'Unknown error'}
                            onClick={() => console.log('result clicked')} // This will reload the page
                        />
                    )}
                </Stepper.Completed>
            </Stepper>

            <Group justify="flex-end" mt="xl">
                <Flex
                    w="100%"
                    align="center"
                    justify="space-between"
                >
                    {active === 0 ? (
                        <Stack gap={0} px="md">
                            <Title order={3}>Subtotal: ${cartValue?.subtotal.toFixed(2)}</Title>
                            <Flex
                                align="center"
                                justify="flex-end"
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
                                    Estimated earning points: {Math.floor(cartValue?.subtotal)}
                                </Text>
                            </Flex>
                        </Stack>
                    ) : (<div />)
                    }

                    <Group>
                        {active !== 0 && active !== 3 && (
                            <Button
                                variant="default"
                                size="lg"
                                radius="lg"
                                onClick={prevStep}
                            >
                                Back
                            </Button>
                        )}
                        {active <= 1 &&
                            <Button
                                size="lg"
                                radius="lg"
                                onClick={nextStep}
                            >
                                Next step
                            </Button>
                        }
                        {
                            active === 2 &&
                            <form
                                onSubmit={
                                    (event) => {
                                        event.preventDefault();
                                        console.log(form.values);
                                        handleFormSubmit(form.values);
                                    }
                                }
                            >
                                <Button
                                    size="lg"
                                    radius="lg"
                                    type="submit"
                                    loading={isLoading}
                                    onClick={() => {
                                        console.log('submitting');
                                    }}
                                >
                                    Submit order
                                </Button>
                            </form>
                        }
                    </Group>

                </Flex>

            </Group>
        </Container>
    );
};

export default CheckoutPage;
