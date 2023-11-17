'use client';

import { useDisclosure } from '@mantine/hooks';
import { FloatButton } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import {
    ActionIcon,
    Button, Card,
    Divider,
    Drawer,
    Flex, NumberInput,
    Image,
    ScrollArea,
    Stack,
    Text,
    Title, rem, Grid, AspectRatio,
} from '@mantine/core';
import { useAtomValue } from 'jotai';
import { IconMinus, IconPlus, IconSparkles, IconTrashX } from '@tabler/icons-react';
import Link from 'next/link';
import { cartAtom } from '@/store/cartStore';
import { ProductDetail } from '@/store/types/type';
import { userRemoveCartItemFromCartAtom, useUpdateCartAtom } from '@/store/cartStoreUtils';

type CartProductItem = {
    product: ProductDetail;
    quantity: number;
};

type CartItemProps = {
    item: CartProductItem;
    updateCartItem: (newQuantity: number) => void;
    removeCartItem: () => void;
};

export const CartItem = ({
                             item,
                             updateCartItem,
                             removeCartItem,
                         }: CartItemProps) => {
    console.log('cart item', item);
    return (
        <Card
            withBorder
            radius="md"
            p="sm"
        >
            <Grid
                gutter="sm"
                align="stretch"
                grow
            >
                <Grid.Col span={4} h="80%">
                    <AspectRatio ratio={1}>
                        <Image src={item.product.picture} alt={item.product.name} />
                    </AspectRatio>
                </Grid.Col>
                <Grid.Col
                    span={8}
                >
                    <Stack
                        h="100%"
                        gap="sm"
                        justify="space-between"
                    >
                        <Flex
                            justify="space-between"
                        >
                            <Text size="md">{item.product.name}</Text>

                            <div>
                                <ActionIcon
                                    variant="subtle"
                                    radius="sm"
                                    size="sm"
                                    onClick={removeCartItem}
                                >
                                    <IconTrashX stroke={1.5} />
                                </ActionIcon>
                            </div>
                        </Flex>
                        <div>
                            <Divider pb="xs" />
                            <Flex
                                justify="space-between"
                                align="center"
                            >
                                <Text fw={500}>${item.product.price}</Text>

                                <Flex
                                    justify="flex-end"
                                    align="center"
                                    gap="sm"
                                >
                                    <ActionIcon
                                        variant="outline"
                                        radius="xl"
                                        size="sm"
                                        onClick={() => {
                                            // console.log('minus clicked', item.quantity);
                                            item.quantity > 1 && updateCartItem(item.quantity - 1);
                                        }}
                                    >
                                        <IconMinus stroke={1.5} />
                                    </ActionIcon>

                                    <NumberInput
                                        size="sm"
                                        w={rem(20)}
                                        value={item.quantity}
                                        onChange={(t) => {
                                            // console.log('number input changed', t);
                                            updateCartItem(Number(t));
                                        }}
                                        clampBehavior="strict"
                                        min={1}
                                        max={item.product.stock}
                                        allowDecimal={false}
                                        variant="unstyled"
                                        hideControls
                                    />

                                    <ActionIcon
                                        variant="outline"
                                        size="sm"
                                        radius="xl"
                                        onClick={() => {
                                            // console.log('plus clicked', item.quantity);

                                            item.quantity < item.product.stock
                                            && updateCartItem(item.quantity + 1);
                                        }}
                                    >
                                        <IconPlus stroke={1.5} />
                                    </ActionIcon>
                                </Flex>
                            </Flex>
                        </div>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Card>
    );
};

export const ShoppingCart = () => {
    const [opened, {
        open,
        close,
    }] = useDisclosure(false);

    const cart = useAtomValue(cartAtom);

    const updateCartAtom = useUpdateCartAtom();
    const removeCartItemAtom = userRemoveCartItemFromCartAtom();

    return (
        <div>
            <FloatButton
                icon={<ShoppingCartOutlined />}
                badge={{
                    count: cart?.totalQuantity || 0,
                    overflowCount: 10,
                    showZero: false,
                    color: 'purple',
                }}
                onClick={open}
            />
            <Drawer
                opened={opened}
                onClose={() => {
                    close();
                }}
                position="right"
                size="md"
                title={<Text fw={700} size="xl">Shopping Cart</Text>}
                padding="md"

            >
                <Stack
                    justify="space-between"
                    gap="md"
                    align="stretch"
                >
                    <ScrollArea.Autosize h="72vh" mah="72vh" type="auto" offsetScrollbars scrollbarSize={12}>

                        <Stack>
                            <div>
                                {cart.items && cart.items.length !== 0
                                    && cart.items.map((item) => item.product && (
                                    <CartItem
                                        key={`cart-item-${item.product.id}-key`}
                                        item={item}
                                        removeCartItem={() => removeCartItemAtom(item.product)}
                                        updateCartItem={
                                            (newQuantity: number) => {
                                                console.log('updateCartItem called with newQuantity',
                                                    item.product.id,
newQuantity,
                                                    item.product.price);
                                                updateCartAtom(item.product, newQuantity);
                                            }
                                        }
                                    />
                                ))}
                                {cart.items && cart.items.length === 0 && (
                                    <Stack
                                        justify="center"
                                        align="center"
                                        h="100%"
                                    >
                                        <Text size="lg">Your cart is empty</Text>
                                        <Link href="/user/shop">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                radius="xl"
                                                mt="sm"
                                            >
                                                <Text size="sm">Go to products</Text>
                                            </Button>
                                        </Link>
                                    </Stack>
                                )}
                            </div>
                        </Stack>
                    </ScrollArea.Autosize>

                    <Stack
                        align="stretch"
                        gap="0"
                    >
                        <Divider />
                        <Stack
                            justify="flex-start"
                            py="sm"
                            px="sm"
                            gap="0"
                            align="stretch"
                        >
                            <Flex
                                align="center"
                                justify="space-between"
                            >
                                <Title order={3}>Subtotal: </Title>
                                <Title order={3}>${cart?.subtotal.toFixed(2)}</Title>
                            </Flex>
                            <Flex
                                align="center"
                                justify="flex-end"
                            >
                                <ActionIcon
                                    variant="transparent"
                                    aria-label="Gradient action icon"
                                    gradient={{
                                        from: 'blue',
                                        to: 'grape',
                                        deg: 165,
                                    }}
                                >

                                    <IconSparkles
                                        stroke={1.5}
                                    />
                                </ActionIcon>

                                <Text
                                    c="dimmed"
                                    gradient={{
                                        from: 'blue',
                                        to: 'grape',
                                        deg: 165,
                                    }}
                                    variant="gradient"
                                >
                                    Estimated earning points: {Math.floor(cart.subtotal)}
                                </Text>
                            </Flex>
                        </Stack>
                        <Flex
                            px="sm"
                            justify="flex-end"
                        >
                            <Link href="/user/checkout">
                                <Button type="submit" onClick={() => close()}>

                                    Checkout
                                </Button>
                            </Link>

                        </Flex>
                    </Stack>
                </Stack>
            </Drawer>
        </div>
    );
};
