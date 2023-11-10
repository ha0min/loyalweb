import { atom } from 'jotai';
import { ProductDetail } from '../type';

export type cartAtomType = {
    items: { product: ProductDetail, quantity: number }[],
    totalQuantity: number,
    subtotal: number
};
export const cartAtom = atom<cartAtomType>({
    items: [],
    totalQuantity: 0,
    subtotal: 0,
});
