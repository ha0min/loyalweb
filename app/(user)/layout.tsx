'use client';

import Footer from '@/components/Footer/Footer';
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu';
import { ShoppingCart } from '@/components/ShoppingCart/ShoppingCart';
import withAuth from '@/components/WithAuth';

const UserLayout = ({
                        children,
                    }: {
    children: React.ReactNode
}) => (

        <div>
            <HeaderMenu />
            {children}
            <Footer />
            <ShoppingCart />
        </div>
    );

export default withAuth(UserLayout);
