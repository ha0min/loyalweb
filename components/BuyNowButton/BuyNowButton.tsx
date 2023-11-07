'use client';

import { useAtomValue } from 'jotai';
import { Button, Flex } from '@mantine/core';
import { IconCheck, IconPlus } from '@tabler/icons-react';
import { ProductDetail } from '@/store/types/type';
import { cartAtom } from '@/store/cartStore';
import { useUpdateCartAtom } from '@/store/cartStoreUtils';

const BuyButton = (props: {
    product: ProductDetail,
    hideAddToCart?: boolean,
}) => {
    // const onAddToCart = () => {
    //     // setChecked((v) => !v);
    //     props.onAddCartClick();
    //     console.log('add to cart icon clicked,', props.id);
    // };
    //
    const onBuyNow = () => {
        console.log('buy now');
        console.log('props', props);
    };

    const cart = useAtomValue(cartAtom);
    const isInCart = cart.items.some(item => item.product.id === props.product.id);

    const updateCartAtom = useUpdateCartAtom();

    return (
        <Flex
            align="center"
            justify="flex-end"
        >

            <Button
                disabled={isInCart}
                style={{
                    display: props.hideAddToCart ? 'none' : 'block',
                }}
                variant="light"
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    updateCartAtom(props.product, 1);
                }}
                color="violet"
                ml="md"
                radius="xl"
            >
                {isInCart ? <IconCheck stroke={1.5} /> : <IconPlus stroke={1.5} />}
            </Button>

            <Button
                variant="outline"
                onClick={
                    (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onBuyNow();
                    }}
                color="violet"
                ml="md"
                radius="xl"
            >
                Buy Now
            </Button>
        </Flex>

    );
};

export default BuyButton;
