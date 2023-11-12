'use client';

import { ActionIcon, Avatar, Button, Divider, Flex, Grid, Paper, Stack, Text } from '@mantine/core';
import { Result, Skeleton } from 'antd';
import { useEffect } from 'react';
import { IconButton } from '@storybook/components';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import { useOrdersList } from '@/api/orders';

const Page = () => {
    const { data, isLoading, isError } = useOrdersList({
        page: 1,
        pageSize: 100,
    });

    if (isError) {
        return <Result
            status="error"
            title="Failed to load order history"
            subTitle={`reason ${isError}`}
        />;
    }

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Paper p="md" radius="md">
            <PageTitle
                title="Order Histroy"
                subtitle="Your order history"
                url="https://em-content.zobj.net/source/telegram/358/card-index-dividers_1f5c2-fe0f.webp"
            />

            <Skeleton
                loading={isLoading}
                active
            >
                <Grid>
                    {data?.records && data.records.map((order) => (
                        <Grid.Col span={12} key={order.id}>
                            <Paper withBorder shadow="sm" p="lg">
                                    <Flex justify="space-between">
                                        <Text>Order Time: {order.createTime}</Text>
                                        <Stack align="end" gap={0}>
                                            <Text size="sm" c="dimmed">Order ID: {order.id}</Text>
                                            <Text size="sm" c="dimmed">{order.remark}</Text>
                                        </Stack>
                                    </Flex>
                                <Divider my="sm" />
                                <Flex justify="space-between" align="center" key={`${order.id}items`}>
                                        <Avatar.Group>
                                            {
                                                order?.orderDetailVOList
                                                && order.orderDetailVOList.map((detail) => (
                                                    <Avatar
                                                        key={detail.id}
                                                        src={detail.productVO?.picture}
                                                        radius="sm"
                                                        size="lg"
                                                        alt={detail.productVO?.name}
                                                    />
                                                ))
                                            }
                                        </Avatar.Group>
                                            <ActionIcon
                                                mx="lg"
                                                c="var(--mantine-primary-color-filled)"
                                                variant="subtle"
                                                size="lg"
                                                component={Link}
                                                href={`/user/orders/${order.id}`}
                                            >
                                                <IconArrowRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                            </ActionIcon>
                                </Flex>
                                <Divider my="sm" />
                                <Stack>
                                    <Flex justify="space-between" align="end">
                                        <Text>{order?.status === 3 ? 'Order Completed' : 'Payment Successful'}</Text>
                                        <Text fw={500} size="lg">Total Amount: ${order.amount}</Text>
                                    </Flex>
                                </Stack>
                            </Paper>
                        </Grid.Col>
                    ))}
                </Grid>

            </Skeleton>
        </Paper>
    );
};

export default Page;
