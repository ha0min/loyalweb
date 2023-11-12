'use client';

import { Paper, Stack, Text, Flex, Divider, Image } from '@mantine/core';
import { useEffect } from 'react';
import { Result, Skeleton } from 'antd';
import { useOrderDetail } from '@/api/orders';
import { PageTitle } from '@/components/PageTitle/PageTitle';

const Page = ({ params }: { params: { id: number } }) => {
    const {
        data,
        isError,
        isLoading,
    } = useOrderDetail(
        params.id,
    );

    useEffect(() => {
        console.log(data);
    }, [data]);

    if (isError) {
        return <Result
            status="error"
            title="Order Not Found"
            subTitle={`Sorry, the order you requested does not exist. ${isError}`}
        />;
    }

    return (
        <Paper p="md">
            <PageTitle
                title="Order Detail"
                subtitle="Check what you got"
                url="https://em-content.zobj.net/source/telegram/358/sparkles_2728.webp"
            />
            <Skeleton loading={isLoading} active>
                {data && (
                    <Paper p="md" shadow="xs" radius="lg" withBorder>
                        <Stack>
                            <Text>Order ID:{data?.id}</Text>
                            <Text>Remark: {data?.remark}</Text>

                            <Divider />
                            <Stack>
                                {data?.orderDetailVOList && data.orderDetailVOList.map((detail) => (
                                    <Flex justify="space-between" align="center" key={`${detail.id}items`}>
                                        <Flex align="center">
                                            <Image src={detail.productVO?.picture} alt="product" w={80} h={80} />
                                            <Stack ml="md">
                                                <Text fw={500} size="lg">{detail.productVO?.name}</Text>
                                                <Text color="dimgray">Price: ${detail.productVO?.price}</Text>
                                            </Stack>
                                        </Flex>
                                        <Stack align="flex-end">
                                            <Text color="dimgray">Quantity: {detail?.number}</Text>
                                            <Text fw={500} size="lg">Total: ${detail.amount}</Text>
                                        </Stack>
                                    </Flex>
                                ))}
                            </Stack>
                            <Divider />
                            <Flex justify="flex-end" align="center">
                                <Stack>
                                    <Text fw={700} size="lg">Total: {data.amount}</Text>
                                    <Text>Order Time: {data?.createTime}</Text>
                                </Stack>
                            </Flex>
                        </Stack>
                    </Paper>
                )}
            </Skeleton>

        </Paper>
    );
};

export default Page;
