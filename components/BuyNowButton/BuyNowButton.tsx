'use client';

import { useAtomValue } from 'jotai';
import { Button, Flex } from '@mantine/core';
import { IconCheck, IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { ProductDetail } from '@/store/types/type';
import { cartAtom } from '@/store/cartStore';
import { useUpdateCartAtom } from '@/store/cartStoreUtils';

const BuyButton = (props: {
    product: ProductDetail,
    hideAddToCart?: boolean,
    isPointRedeem?: boolean,
}) => {
    const router = useRouter();
    const onBuyNow = () => {
        console.log('buy now');
        console.log('props', props);
        router.push(`/user/checkout/${props.product.id}`);
    };

    const onRedeemNow = () => {
        console.log('redeem now');
        console.log('props', props);
        router.push(`/user/rewards/redeem/${props.product.id}`);
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
                        props?.isPointRedeem ? onRedeemNow() : onBuyNow();
                    }}
                color="violet"
                ml="md"
                radius="xl"
            >
                {props?.isPointRedeem ? 'Redeem' : 'Buy Now'}
            </Button>
        </Flex>

    );
};

export default BuyButton;
