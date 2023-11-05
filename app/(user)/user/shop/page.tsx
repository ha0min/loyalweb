'use client';

import {
    Text,
    Image,
    Container,
    Grid,
    Skeleton,
    Card,
    Group,
    Badge,
    Flex,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { List } from 'antd';
import { ProductDetail } from '@/store/types/type';
import BuyButton from '@/components/BuyNowButton/BuyNowButton';

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

type ProductListProps = {
    products?: ProductDetail[];
};

const mockData: ProductDetail[] =
    [
        {
            picture: 'http://dummyimage.com/400x400',
            stock: 5,
            id: 43,
            description: '精情包那则政其性去教照山管收。克光织此算内百件存斯便平划名局实。从素说常民业几支非接准济江率组清矿。级手切来意基清第那想近便华果。常断外或十路开分且党发没单矿。',
            category: 'est in consectetur dolore',
            price: 24,
            name: '次建同周因难资',
        },
        {
            picture: 'http://dummyimage.com/400x400',
            description: '下知车府除层石明达题层家王形什。米华温图状行确白委你小达层电通便。光拉战做林边运府七号我空争而必。按必装这响儿他家白求美际业机应图认点。条选状光马示来酸世声花铁。数使应采铁时派学县术立了院调好飞达。',
            name: '县张例边感省该',
            price: 100,
            id: 642,
            category: 'eu',
            stock: 43,
        },
        {
            category: 'sed consectetur',
            id: 537,
            description: '金好记青识身今属效府根西当主格金第。党取性单界得容才先山任车土水书放。是车音给议住研节回约到支们者照到金。',
            price: 76,
            stock: 74,
            picture: 'http://dummyimage.com/400x400',
            name: '太世必始或',
        },
        {
            description: '身利或运数周通热毛流层精这道却把较。验入证特广了六自所连称意级照离角制门。会县并存主根眼接没取习文何。水反子构很位整况小极两反必容。领本和约更状厂维规位只议眼天系。它平于得照美率着节拉说成常不体。',
            picture: 'http://dummyimage.com/400x400',
            category: 'non dolore cupidatat in magna',
            stock: 83,
            price: 12,
            name: '地那次立',
            id: 62,
        },
        {
            id: 624,
            category: 'aliquip dolor ea culpa pariatur',
            price: 10,
            description: '起实马反出儿地次社消领铁深。年同听些员阶族第市心习信。际影信改造史听族学但上着。型变多层但花程构记专斗社思。风那区马手位了与干至意引院律标。',
            stock: 84,
            name: '间论联标手证号',
            picture: 'http://dummyimage.com/400x400',
        },
    ];

const ProductList = (props: ProductListProps) =>

     (
        <div>
            <List
                pagination={{
                    align: 'center',
                    defaultPageSize: 12,
                    hideOnSinglePage: true,
                    pageSizeOptions: ['12', '24', '36'],
                    total: props.products.length,
                }}
                dataSource={props.products}
                grid={{
                    gutter: 16,
                    column: 2,
                }}
                renderItem={(item: ProductDetail) => (
                    <List.Item>
                        <div>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section>
                                    <Image
                                        src={item?.picture}
                                        height={160}
                                        alt="Norway"
                                    />
                                </Card.Section>

                                <Group justify="flex-start" gap="sm" mt="md" mb="xs">
                                    <Badge color="pink" variant="light">
                                        On Sale
                                    </Badge>
                                    <Text size="md">{item?.name}</Text>
                                </Group>

                                <Flex
                                    justify="flex-end"
                                    align="center"
                                    mb="md"
                                >
                                    <Text fw={700} size="xl" px="sm">
                                        ${item?.price}
                                    </Text>
                                </Flex>

                                <BuyButton
                                    product={item}
                                />
                            </Card>
                        </div>
                    </List.Item>
                )}
            />
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
                                <ProductList products={mockData} />
                            </Grid.Col>
                        </Grid>

                    </Grid.Col>
                </Grid>
            </Container>
        </div>

    );
export default ShopPage;
