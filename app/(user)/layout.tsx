'use client';

import { Provider, useAtomValue } from 'jotai';
import Footer from '@/components/Footer/Footer';
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu';
import { ShoppingCart } from '@/components/ShoppingCart/ShoppingCart';

const UserLayout = ({
                        children,
                    }: {
    children: React.ReactNode
}) => (

        <div>
            <Provider>
            <HeaderMenu />
            {children}
            <Footer />
            <ShoppingCart />
            </Provider>
        </div>
    );

export default UserLayout;
