'use client';

import { Button, Divider, Grid, Image, Paper, Select, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { Result, Skeleton } from 'antd';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import { SubmitRedeemFormValues, useRedeem } from '@/api/forms';
import { usePointsProductDetail } from '@/api/product';
import { CheckoutResult } from '@/components/CheckoutResult';
import { useCurrentUser } from '@/api/user';

const Page = ({ params }: { params: { id: string } }) => {
    const {
        data: product,
        isError,
        isLoading,
    } = usePointsProductDetail(Number(params.id));
    const [quantity, setQuantity] = useState(1);
    const {
        currentUser,
        isCurrentUserLoading,
        currentError,
    } = useCurrentUser();
    const {
        redeemResponse,
        isLoading: isRedeemLoading,
        submitRedeem,
        error,
    } = useRedeem();
    const route = useRouter();

    let quantityOptions = [];

    const form = useForm<
        SubmitRedeemFormValues
    >({
        initialValues: {
            rewardId: Number(params.id),
            quantity: 1,
        },

        validate: (values) => ({
            rewardId: values.rewardId !== null
                ? 'Please add at least one product' : null,
            quantity: values.quantity < product.stock ? null : 'Not enough stock',
        }),
    });

    if (product && currentUser) {
        const canRedeem = Math.floor(currentUser.points / product.points);
        quantityOptions = Array.from(Array(Math.min(canRedeem, product.stock))
            .keys())
            .map((i) => ({
                value: (i + 1).toString(),
                label: (i + 1).toString(),
            }));
        console.log('quantityOptions', canRedeem, product.stock, quantityOptions);
    }

    useEffect(() => {
        console.log('quantity', quantity);
        form.setFieldValue('orderDetailAddRequestList', [{
            productId: product?.id,
            number: quantity,
        }]);
    }, [quantity]);

    if (redeemResponse) {
        return error ? (
            <CheckoutResult
                key="submit-error"
                success={false}
                message={redeemResponse.message || 'Unknown error'}
                onClick={() => submitRedeem(form.values)}
                isRedeem
            />
        ) : (
            <CheckoutResult
                key="submit-success"
                success
                isRedeem
                pointsEarned={parseInt(redeemResponse.data.pointsRedeemed.toString(), 10)}
                currentPoints={parseInt(redeemResponse.data.points.toString(), 10)}
                onClick={() => route.push('/user')}
            />
        );
    }

    if (isError || currentError || error) {
        console.log('error', isError, currentError, error);
        return <Result
            status="error"
            title="Something went wrong"
            subTitle={`Please try again later. ${isError}`}
        />;
    }

    return (
        <Paper p="md">
            <PageTitle title="Redeem Rewards" />
            <Divider />
            <Skeleton
                active
                loading={isLoading || isCurrentUserLoading}
            >
                {product && (
                    <Stack>
                        <Grid p="md">
                            <Grid.Col span={3}>
                                <Image src={product.picture} alt={product.name} />
                            </Grid.Col>
                            <Grid.Col span={8}>
                                <Title order={2}>{product.name}</Title>
                                <Text>{product.description}</Text>
                                <Text fw={500}>{product.points} Pts.</Text>
                                <Select
                                    label="Quantity"
                                    placeholder="Select quantity"
                                    data={quantityOptions}
                                    value={quantity.toString()}
                                    onChange={(e) => setQuantity(Number(e))}
                                />
                            </Grid.Col>
                        </Grid>
                        <Divider />
                        <Button
                            onClick={() => {
                                console.log('submit order');
                                console.log('form', form.values);
                                submitRedeem(form.values);
                            }}
                            loading={isRedeemLoading}
                        >
                            Submit Order
                        </Button>
                    </Stack>
                )}
            </Skeleton>
        </Paper>
    );
};

export default Page;