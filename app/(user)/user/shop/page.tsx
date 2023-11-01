'use client';

import { AppShell, Image, Container, Grid, SimpleGrid, Skeleton } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

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

const ProductFilter = () => (
    <div>
        <Skeleton height={200} radius="md" animate={false} />
        <div>4</div>
    </div>
);

const ProductList = () => (
    <div>
        <Skeleton height={200} radius="md" animate={false} />
        <div>4</div>
    </div>
);

const ShopPage = () =>
    // here we need to filter the products by category
    // and then display them in product list

     (
        <div>
            <Container my="md">
                <Grid my="md">
                    <Grid.Col>
                        <Banner />
                    </Grid.Col>
                </Grid>

                <Grid>

                    <Grid.Col>
                        <Grid gutter="md">
                            <Grid.Col span={3}>
                                <ProductFilter />
                            </Grid.Col>

                            <Grid.Col span={9}>
                                <ProductList />
                            </Grid.Col>
                        </Grid>

                    </Grid.Col>
                </Grid>
            </Container>
        </div>

    );
export default ShopPage;
