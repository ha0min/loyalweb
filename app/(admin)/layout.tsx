'use client';

import Footer from '@/components/Footer/Footer';
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu';
import withAuth from '@/components/WithAuth';

const AdminLayout = ({
                        children,
                    }: {
    children: React.ReactNode
}) => (

    <div>
        <HeaderMenu />
        {children}
        <Footer />
    </div>
);

export default withAuth(AdminLayout);
