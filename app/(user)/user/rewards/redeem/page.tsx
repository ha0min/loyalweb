'use client';

import { useEffect, useState } from 'react';
import { Divider, Image, Text, Paper, Title, Container, Flex } from '@mantine/core';
import { Skeleton } from 'antd';
import { ProductDetail } from '@/store/types/type';
import ProductList from '@/components/ProductList';
import { usePointsProductList } from '@/api/product';

const RewardsRedeemPage = () => {
    const [products, setProducts] = useState<ProductDetail[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'des'>('asc');
    const [categories, setCategories] = useState<string[]>([]);
    // const [isLoading, setIsLoading] = useState(true);

    const {
        data,
        isLoading,
        isError,
    } = usePointsProductList({
        pageSize: 1000,
        page: 1,
    });

    useEffect(() => {
        if (data) {
            const allCategories = Array.from(new Set(data.records.map(item => item.category)));
            setCategories(allCategories);
            setProducts(data.records);
            setSelectedCategories(allCategories);
        }
    }, [data]);

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
                    <Text fw={500} size="lg">You currently have: 1000 points.</Text>
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
