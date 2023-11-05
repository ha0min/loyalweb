import { useSetAtom } from 'jotai';
import { ProductDetail } from '../type';
import { cartAtom } from './cartStore';

export const useUpdateCartAtom = () => {
    const setCartAtom = useSetAtom(cartAtom);
    const updateCart = (product: ProductDetail, newQuantity: number) => {
        setCartAtom((prev) => {
            let totalPriceChange = 0;
            let quantityChange = 0;
            const itemIndex = prev.items.findIndex((item) => item.product.id === product.id);
            const newItems = [...prev.items];
            if (itemIndex === -1) {
                newItems.push({
                    product,
                    quantity: newQuantity,
                });
                quantityChange = newQuantity;
                totalPriceChange = newQuantity * product.price;
            } else {
                quantityChange = newQuantity - newItems[itemIndex].quantity;
                totalPriceChange = (newQuantity - newItems[itemIndex].quantity) * newItems[itemIndex].product.price;
                newItems[itemIndex] = {
                    product,
                    quantity: newQuantity,
                };
            }
            return {
                ...prev,
                items: newItems,
                totalQuantity: prev.totalQuantity + quantityChange,
                subtotal: prev.subtotal + totalPriceChange,
            };
        });
    };

    return updateCart;
};

export const userRemoveCartItemFromCartAtom = () => {
    const setCartAtom = useSetAtom(cartAtom);
    const removeCartItem = (product: ProductDetail) => {
        setCartAtom((prev) => {
            const itemIndex = prev.items.findIndex((item) => item.product.id === product.id);
            if (itemIndex === -1) {
                return prev;
            }
            const newItems = [...prev.items];
            const removedItem = newItems.splice(itemIndex, 1)[0];
            return {
                ...prev,
                items: newItems,
                totalQuantity: prev.totalQuantity - removedItem.quantity,
                subtotal: prev.subtotal - removedItem.product.price * removedItem.quantity,
            };
        });
    };

    return removeCartItem;
};
