'use client';

import {
    Image,
    Container,
    Grid, Button,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Result, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { ProductDetail } from '@/store/types/type';
import ProductFilter from '@/components/ProductFilter';
import ProductList from '@/components/ProductList';
import { useProductList } from '@/api/prodcut';
import { PageTitle } from '@/components/PageTitle/PageTitle';

const Banner = () => (
    <Carousel slideSize="70%" height={200} loop slideGap="md" controlSize={30} withIndicators>
        <Carousel.Slide>
            <Image src="https://p.ipic.vip/mifc6g.png" />
        </Carousel.Slide>

        <Carousel.Slide>
            <Image src="https://p.ipic.vip/mifc6g.png" />
        </Carousel.Slide>

        <Carousel.Slide>
            <Image src="https://p.ipic.vip/mifc6g.png" />
        </Carousel.Slide>

        <Carousel.Slide>
            <Image src="https://p.ipic.vip/mifc6g.png" />
        </Carousel.Slide>
    </Carousel>
);

const ShopPage = () => {
    // here we need to filter the products by category
    // and then display them in product list
    const [originalProducts, setOriginalProducts] = useState<ProductDetail[]>([]);
    const [products, setProducts] = useState<ProductDetail[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'des'>('asc');
    const [categories, setCategories] = useState<string[]>([]);
    // const [isLoading, setIsLoading] = useState(true);

    const {
        data,
        isLoading,
        isError,
    } = useProductList({
        pageSize: 1000,
        page: 1,
    });

    // Fetch data from API
    useEffect(() => {
        if (data) {
            const allCategories = Array.from(new Set(data.records.map(item => item.category)));
            setCategories(allCategories);
            setSelectedCategories(allCategories);
            setProducts(data.records);
            setOriginalProducts(data.records);
        }
    }, [data]);

    // Apply filters and sorting whenever the selected categories or sort order changes
    useEffect(() => {
        if (!data) return;

        let filteredProducts = [...data.records];

        if (selectedCategories.length > 0) {
            filteredProducts = filteredProducts.filter(
                item => selectedCategories.includes(item.category)
            );
        }

        filteredProducts.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

        setProducts(filteredProducts);
    }, [selectedCategories, sortOrder, data]);

    if (isError) {
        return (
            <Result
                status="error"
                title="Error loading products"
                subTitle={isError.message}
                extra={<Button type="button">Try again</Button>}
            >
                Error loading products...
            </Result>
        );
    }

    return (
            <Container p="md">
                <PageTitle
                    title="Buy your favorite product"
                    subtitle="Earn points for every purchase you make."
                    url="https://em-content.zobj.net/source/telegram/358/shopping-bags_1f6cd-fe0f.webp"
                />
                <Grid my="md">
                    <Grid.Col>
                        <Banner />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col>
                        <Skeleton loading={isLoading}>
                            <Grid gutter="md">
                                <Grid.Col span={3}>
                                    <ProductFilter
                                        categories={categories}
                                        onSortChange={setSortOrder}
                                        onCategoryChange={setSelectedCategories}
                                    />
                                </Grid.Col>

                                <Grid.Col span={9}>
                                    <ProductList products={products} total={products.length} />
                                </Grid.Col>
                            </Grid>
                        </Skeleton>
                    </Grid.Col>
                </Grid>
            </Container>
    );
};
export default ShopPage;
