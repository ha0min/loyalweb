import { List } from 'antd';
import { Badge, Button, Card, Flex, Grid, Group, Image, Modal, Space, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { ProductDetail } from '@/store/types/type';
import BuyButton from '@/components/BuyNowButton/BuyNowButton';

type ProductListProps = {
    products?: ProductDetail[];
    total?: number;
};

const ProductOfDetail = (props: { product?: ProductDetail }) => {
    const { product } = props;
    return (
        <div>
            <Stack p="md" gap="xl">
                <Grid>
                    <Grid.Col span={4}>
                        <Image src={product.picture} alt={product.name} radius="md" width={200} height={200} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Stack align="strech">
                            <Title order={2}>{product.name}</Title>
                            <Text c="dimmed" size="sm">{product.category}</Text>
                            <Badge color="purple" variant="light" size="lg" mt="md">
                                In Stock
                            </Badge>

                            <Text size="lg" fw={500} mt="md">
                                ${product.price.toFixed(2)}
                            </Text>
                        </Stack>
                    </Grid.Col>
                </Grid>

                <Space h="md" />

                <Text size="sm" style={{ lineHeight: 1.5 }}>
                    {product.description}
                </Text>

                <Space h="md" />
            </Stack>

            <BuyButton
                product={product}
            />
        </div>
    );
};

const ProductList = (props: ProductListProps) => {
    const [opened, {
        open,
        close,
    }] = useDisclosure(false);
    const [product, setDetail] = useState<ProductDetail>();

    return (
        <div>
            <Modal opened={opened} size="xl" onClose={close} title="Product Detailed" centered>
                <ProductOfDetail product={product} />
            </Modal>
            <List
                pagination={{
                    align: 'center',
                    defaultPageSize: 12,
                    hideOnSinglePage: true,
                    pageSizeOptions: ['12', '24', '36'],
                    total: props.total,
                }}
                dataSource={props.products}
                grid={{
                    gutter: 16,
                    column: 2,
                }}
                renderItem={(item: ProductDetail) => (
                    <List.Item>
                        <div>
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                onClick={() => {
                                    setDetail(item);
                                    open();
                                }}
                            >
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
};

export default ProductList;
