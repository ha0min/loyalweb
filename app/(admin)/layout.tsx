'use client';

import dynamic from 'next/dynamic';
import { CrownFilled, DashboardFilled, SignalFilled, TabletFilled } from '@ant-design/icons';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '@/components/Footer/Footer';
import { withAdminAuth } from '@/components/WithAuth';
import { NavbarMinimal } from '@/components/Navbar';
import { Logo } from '@/components/Logo/Logo';

const ProLayout = dynamic(() => import('@ant-design/pro-layout'), {
    ssr: false,
});

const AdminLayout = ({
                         children,
                     }: {
    children: React.ReactNode
}) => {
    const [routes, setRoutes] = useState(
        {
            path: '/admin',
            routes: [
                {
                    path: '/admin',
                    name: 'Dashboard',
                    icon: <DashboardFilled />,
                },
                {
                    path: '/admin/rewards',
                    name: 'Rewards',
                    icon: <CrownFilled />,
                    routes: [
                        {
                            path: '/admin/rewards/manage',
                            name: 'Management',
                        },
                        {
                            path: '/admin/rewards/history',
                            name: 'History',
                        },
                    ],
                },
                {
                    name: 'Orders',
                    icon: <TabletFilled />,
                    path: '/admin/orders',
                },
                {
                    path: '/admin/analytics',
                    icon: <SignalFilled />,
                    name: 'Analytics',
                },
            ],
        }
    );

    return (
        <div>
            <ProLayout
                menuItemRender={
                    (item, dom) => (
                        <Link
                            href={item.path}
                        >
                            {dom}
                        </Link>
                    )
                }
                route={routes}
                title="Fanly"
                logo={<Logo />}
                locale="en-US"
                footerRender={() => <Footer />}
            >
                {children}
            </ProLayout>
        </div>
    );
};

// TODO add withAdminAuth
export default AdminLayout;
