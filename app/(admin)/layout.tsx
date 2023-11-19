'use client';

import { CrownFilled, DashboardFilled, LogoutOutlined, ShopFilled } from '@ant-design/icons';
import Link from 'next/link';
import { useState } from 'react';
import { App, ConfigProvider } from 'antd';
import enUSIntl from 'antd/lib/locale/en_US';
import { ProLayout } from '@ant-design/pro-layout';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer/Footer';
import { withAdminAuth } from '@/components/WithAuth';
import { Logo } from '@/components/Logo/Logo';
import { useUserAtomLogout } from '@/store/userStoreUtils';
import { useLogout } from '@/api/user';

// const ProLayout = dynamic(() => import('@ant-design/pro-layout'), {
//     ssr: false,
// });

const AdminLayout = ({
                         children,
                     }: {
    children: React.ReactNode
}) => {
    const atomLogout = useUserAtomLogout();
    const { logout } = useLogout();
    const route = useRouter();

    const [routes, setRoutes] = useState(
        {
            path: '/admin',
            routes: [
                {
                    path: '/admin/dashboard',
                    name: 'Dashboard',
                    icon: <DashboardFilled />,
                },
                {
                    path: '/admin/rewards',
                    name: 'Rewards',
                    icon: <CrownFilled />,
                },
                {
                    path: '/admin/products',
                    icon: <ShopFilled />,
                    name: 'Products',
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
                        menuFooterRender={() => (
                            <Button
                                onClick={() => {
                                    console.log('logout');
                                    atomLogout();
                                    logout()
                                        .then(() => {
                                            console.log('logout success');
                                            route.push('/');
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                }}
                            >
                                <LogoutOutlined />
                            </Button>
                        )
                    }
                    >
                        {children}
                    </ProLayout>
                </App>
            </ConfigProvider>
        </div>
    );
};

//  add withAdminAuth
export default withAdminAuth(AdminLayout);
