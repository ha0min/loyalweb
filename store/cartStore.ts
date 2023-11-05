import { atom, useSetAtom } from 'jotai';
import { ProductDetail, User } from '../type';

export const userAtom
    = atom<User | null>(null);

export type cartAtomType = {
    items: { product: ProductDetail, quantity: number }[],
    totalQuantity: number,
    subtotal: number
};
export const cartAtom = atom<cartAtomType>({
    items: [
        {
            product: {
                category: 'sed consectetur',
                id: 57,
                description: '金好记青识身今属效府根西当主格金第。党取性单界得容才先山任车土水书放。是车音给议住研节回约到支们者照到金。',
                price: 76,
                stock: 74,
                picture: 'http://dummyimage.com/400x400',
                name: '太世必始或',
            },
            quantity: 1,
        },
    ],
    totalQuantity: 1,
    subtotal: 76,
});
