'use client';

import { Paper, Select, Text, Image, Title, Grid, Stack, Divider, TextInput, Button, Container } from '@mantine/core';
import { Result, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useProductDetail } from '@/api/product';
import { PaymentMimic } from '@/components/Payment';
import { SubmitOrderFormValues, useSubmitOrder } from '@/api/forms';
import { CheckoutResult } from '@/components/CheckoutResult';

const Page = ({ params }: { params: { id: string } }) => {
    const {
        data: product,
        isError,
        isLoading,
    } =
        useProductDetail(params.id);
    const [quantity, setQuantity] = useState(1);

    const [quantityOptions, setQuantityOptions] = useState([{
        value: '1',
        label: '1',
    }]);

    const form = useForm<
        SubmitOrderFormValues
    >({
        initialValues: {
            orderDetailAddRequestList: [] as SubmitOrderFormValues['orderDetailAddRequestList'],
            remark: '',
        },

        validate: (values) => ({
            orderDetailAddRequestList: values.orderDetailAddRequestList.length === 0
                ? 'Please add at least one product' : null,
            remark: values.remark.trim().length > 0 ? null : 'Please input the remark for the order',
        }),
    });

    useEffect(() => {
        const quantitys = Array.from(Array(Number(product?.stock || 1))
            .keys())
            .map((i) => ({
                value: (i + 1).toString(),
                label: (i + 1).toString(),
            }));
        setQuantityOptions(quantitys);
        console.log('quantityOptions', quantityOptions);
    }, [product]);

    useEffect(() => {
        console.log('quantity', quantity);
        form.setFieldValue('orderDetailAddRequestList', [{
            productId: product?.id,
            number: quantity,
        }]);
    }, [quantity]);

    const route = useRouter();

    const {
        submitOrder,
        orderResponse,
        error,
        isLoading: isSubmitting,
    } = useSubmitOrder();

    if (orderResponse) {
        return error ? (
            <CheckoutResult
                key="submit-error"
                success={false}
                message={orderResponse.message || 'Unknown error'}
                onClick={() => submitOrder(form.values)}
            />
        ) : (
            <CheckoutResult
                key="submit-success"
                success
                pointsEarned={parseInt(orderResponse.data.pointsEarned, 10)}
                currentPoints={parseInt(orderResponse.data.points, 10)}
                onClick={() => route.push(`/user/orders/${orderResponse.data.id}`)}
            />
        );
    }

    if (isError) {
        return (
            <Result
                status="error"
                title="Error"
                subTitle={`Sorry, something went wrong. ${isError}`}
            />
        );
    }

    return (
        <Container p="md">
            <Paper withBorder p="md" radius="md" shadow="md">
                <Skeleton loading={isLoading} active>
                    {isError && (
                        <Result
                            status="error"
                            title="Error"
                            subTitle={`Sorry, something went wrong. ${isError}`}
                        />
                    )}
                    {product && (
                        <Stack>
                            <Grid>
                                <Grid.Col span={3}>
                                    <Image src={product.picture} alt={product.name} />
                                </Grid.Col>
                                <Grid.Col span={8}>
                                    <Title order={2}>{product.name}</Title>
                                    <Text>{product.description}</Text>
                                    <Text>Price: ${product.price}</Text>
                                    <Text>Category: {product.category}</Text>
                                    <Select
                                        label="Quantity"
                                        placeholder="Select quantity"
                                        data={quantityOptions}
                                        value={quantity.toString()}
                                        onChange={(e) => setQuantity(Number(e))}
                                    />
                                </Grid.Col>
                            </Grid>
                            <Divider
                                label="Shipping"
                                labelPosition="center"
                            />
                            <Paper w="100%" shadow="xs" radius="lg" withBorder p="md">
                                <TextInput
                                    label="Remark"
                                    placeholder="Note for the order"
                                    {...form.getInputProps('remark')}
                                />
                                <TextInput
                                    mt="md"
                                    label="Address"
                                    defaultValue="500 El Camino Real, Santa Clara, CA 95053"
                                />
                            </Paper>
                            <Divider
                                label="Payment"
                                labelPosition="center"
                            />
                            <PaymentMimic />
                            <Divider />
                            <Button
                                onClick={() => {
                                    console.log('submit order');
                                    console.log('form', form.values);
                                    submitOrder(form.values);
                                }}
                                loading={isSubmitting}
                            >
                                Submit Order
                            </Button>

                        </Stack>
                    )}
                </Skeleton>
            </Paper>
        </Container>
    );
};

export default Page;
