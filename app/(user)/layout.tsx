'use client';

import HeaderMenu from '@/components/HeaderMenu/HeaderMenu';
import Footer from '@/components/Footer/Footer';

const UserLayout = ({ children }: { children: React.ReactNode }) =>
    // get user info from context

     (
        <div>
            <HeaderMenu />
            {children}
            <Footer />
        </div>
    );

export default UserLayout;
