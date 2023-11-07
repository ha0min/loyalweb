import { List } from 'antd';
import { Badge, Card, Flex, Group, Image, Text } from '@mantine/core';
import { ProductDetail } from '@/store/types/type';
import BuyButton from '@/components/BuyNowButton/BuyNowButton';

type ProductListProps = {
    products?: ProductDetail[];
    total?: number;
};
const ProductList = (props: ProductListProps) =>
    (
        <div>
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

export default ProductList;
