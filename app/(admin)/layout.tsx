'use client';

import dynamic from 'next/dynamic';
import { CrownFilled, DashboardFilled, ShopFilled, SignalFilled, TabletFilled } from '@ant-design/icons';
import Link from 'next/link';
import { useState } from 'react';
import { App, ConfigProvider } from 'antd';
import enUSIntl from 'antd/lib/locale/en_US';
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
                    path: '/admin/products',
                    icon: <ShopFilled />,
                    name: 'Products',
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
            <ConfigProvider
                locale={enUSIntl}
            >
                <App>
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
                </App>
            </ConfigProvider>
        </div>
    );
};

// TODO add withAdminAuth
export default AdminLayout;
