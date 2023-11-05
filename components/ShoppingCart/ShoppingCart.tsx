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
import { cartAtom, cartAtomType } from '@/store/cartStore';
import { ProductDetail } from '../../../fanlyweb/common/type';
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

const CartItem = ({
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
                                            console.log('minus clicked', item.quantity);
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
                                            console.log('number input changed', t);
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
                                            console.log('plus clicked', item.quantity);

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
    // const [localCart, setLocalCart] = useState<cartAtomType>(
    //     {
    //         items: cart.items,
    //         totalQuantity: cart.totalQuantity,
    //         subtotal: cart.subtotal,
    //     }
    // );
    //
    // // Function to update global state
    // const syncCartWithGlobalState = () => {
    //     console.log('updated localCart', localCart);
    //     setCart(localCart);
    // };
    //
    // // Function to update local state
    // const updateCartItem = (id: number, newQuantity: number) => {
    //     console.log('updateCartItem', id, newQuantity);
    //     let totalPriceChange = 0;
    //     let quantityChange = 0;
    //     const updatedLocalCartItems = localCart.items.map((item) => {
    //         if (item.product.id === id) {
    //             quantityChange = newQuantity - item.quantity;
    //             totalPriceChange = (newQuantity - item.quantity) * item.product.price; // Assuming item has a price
    //             return {
    //                 ...item,
    //                 quantity: newQuantity,
    //             };
    //         }
    //         return item;
    //     });
    //     console.log('updatedLocalCartItems', totalPriceChange, quantityChange);
    //     setLocalCart((currentLocalCart) => ({
    //         ...currentLocalCart,
    //         totalQuantity: currentLocalCart.totalQuantity + quantityChange,
    //         subtotal: currentLocalCart.subtotal + totalPriceChange,
    //         items: updatedLocalCartItems,
    //     }));
    //     syncCartWithGlobalState();
    // };
    //
    // // Function to remove item from local state
    // const removeCartItem = (id: number | string) => {
    //     setLocalCart((currentLocalCart) => {
    //         // Find the item to remove to get its quantity
    //         const itemToRemove = currentLocalCart.items.find((item) => item.product.id === id);
    //         const itemToRemoveQuantity = itemToRemove ? itemToRemove.quantity : 0;
    //
    //         return {
    //             ...currentLocalCart,
    //             // Filter out the item to remove
    //             items: currentLocalCart.items.filter((item) => item.product.id !== id),
    //             // Deduct the quantity of the removed item from the total
    //             totalQuantity: currentLocalCart.totalQuantity - itemToRemoveQuantity,
    //         };
    //     });
    // };
    //
    // useEffect(() => {
    //     console.log('useEffect cart before', cart);
    //     // Initialize local state with global state when the component mounts
    //     syncCartWithGlobalState();
    //     console.log('useEffect cart after', cart);
    // }, [localCart]);

    const updateCartAtom = useUpdateCartAtom();
    const removeCartItemAtom = userRemoveCartItemFromCartAtom();

    return (
        <div>
            <FloatButton
                icon={<ShoppingCartOutlined />}
                badge={{
                    count: cart.totalQuantity,
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
                                {cart.items.map((item) => item.product && (
                                    <CartItem
                                        key={`cart-item-${item.product.id}-key`}
                                        item={item}
                                        removeCartItem={() => removeCartItemAtom(item.product)}
                                        updateCartItem={
                                            (newQuantity: number) => {
                                                console.log('updateCartItem called with newQuantity', item.product.id, newQuantity);
                                                updateCartAtom(item.product, newQuantity);
                                            }
                                        }
                                    />
                                ))}
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
                                <Title order={3}>${cart?.subtotal}</Title>
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
                                    Estimated earning points: {cart.subtotal}
                                </Text>
                            </Flex>
                        </Stack>
                        <Flex
                            px="sm"
                            justify="flex-end"
                        >
                            <Button
                                onClick={() => {
                                }}
                            >
                                Checkout
                            </Button>
                        </Flex>
                    </Stack>
                </Stack>
            </Drawer>
        </div>
    );
};
