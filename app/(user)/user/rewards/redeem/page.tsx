'use client';

import { useEffect, useState } from 'react';
import { Divider, Image, Text, Paper, Title, Container, Flex, Select, Checkbox } from '@mantine/core';
import { Result, Skeleton } from 'antd';
import { ProductDetail } from '@/store/types/type';
import ProductList from '@/components/ProductList';
import { usePointsProductList } from '@/api/product';
import { useCurrentUser } from '@/api/user';

const RewardsRedeemPage = () => {
    const [products, setProducts] = useState<ProductDetail[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    const { currentUser, isCurrentUserLoading, currentError } = useCurrentUser();

    const {
        data,
        isLoading,
        isError,
    } = usePointsProductList({
        pageSize: 1000,
        page: 1,
    });

    const [isFilter, setIsFilter] = useState(false);

    useEffect(() => {
        if (data) {
            const allCategories = Array.from(new Set(data.records.map(item => item.category)));
            setProducts(data.records);
        }
    }, [data]);

    useEffect(() => {
        if (isFilter) {
            setProducts(data?.records.filter(item => item.points <= currentUser?.points));
        } else {
            setProducts(data?.records);
        }
    }, [isFilter]);

    if (isError) {
        return <Result
            status="error"
            title="Something went wrong"
            subTitle={`Please try again later. ${isError}`}
        />;
    }

    return (
        <Container p="md">
            <Flex
                justify="flex-start"
                align="center"
                gap="md"
                my="md"
            >
                <Image
                    src="https://em-content.zobj.net/source/telegram/358/star-struck_1f929.webp"
                    alt="Redeem Rewards"
                    w={80}
                    h={80}
                    radius="lg"
                />

                <div>
                    <Title>Let&apos;s celebrate your loyalty!</Title>
                    <Skeleton loading={currentUser !== null || isLoading} active>
                        <Text fw={500} size="lg">You currently have: {currentUser?.points} points.</Text>
                        <Checkbox onClick={() => { setIsFilter(!isFilter); }}>
                            Only show what can redeemed
                        </Checkbox>
                    </Skeleton>
                </div>
            </Flex>

            <Divider />
            <Skeleton loading={isLoading && data !== null} active>
                <Paper p="md" m="md" radius="lg" shadow="sm">
                    <ProductList
                        products={products}
                        total={data?.total}
                        columns={3}
                        isPointsList
                        hideAddToCart
                    />
                </Paper>
            </Skeleton>
        </Container>
    );
};

export default RewardsRedeemPage;
