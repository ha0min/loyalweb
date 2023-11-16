'use client';

import { PageContainer } from '@ant-design/pro-layout';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { Typography } from 'antd';
import Link from 'next/link';

const Page = () => {
    const { Statistic, Divider } = StatisticCard;
    const responsive = false;

    return (
        <PageContainer
            header={{
                title: 'Dashboard',
                ghost: true,
                breadcrumb: {},
            }}
        >
            <Typography.Title level={2}>User at a glance</Typography.Title>
            <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
                <StatisticCard
                    statistic={{
                        title: 'Current User',
                        value: 63,
                    }}
                />
                <Divider type={responsive ? 'horizontal' : 'vertical'} />
                <StatisticCard
                    statistic={{
                        title: 'User Placed Orders',
                        value: 36,
                        description: <Statistic title="Percentage" value="61.5%" />,
                    }}
                    chart={
                        <img
                            src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                            alt="Percentage"
                            width="100%"
                        />
                    }
                    chartPlacement="left"
                />
                <StatisticCard
                    statistic={{
                        title: 'User Cancelled Orders',
                        value: 17,
                        description: <Statistic title="Percentage" value="18.5%" />,
                    }}
                    chart={
                        <img
                            src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
                            alt="Percentage"
                            width="100%"
                        />
                    }
                    chartPlacement="left"
                />
            </StatisticCard.Group>

            <Typography.Title level={2}>Manage Orders</Typography.Title>
            <ProCard.Group
                direction={responsive ? 'column' : 'row'}
                gutter={[16, 16]}
                extra={
                <Link
                    href="/admin/orders"
                >
                    View All
                </Link>
                }
            >
                <ProCard
                    title="Pending Orders"
                    colSpan={responsive ? 0 : 8}
                >
                    <Statistic title="Orders" value={93} />
                </ProCard>

                <ProCard
                    title="Completed Orders"
                    colSpan={responsive ? 0 : 8}
                >
                    <Statistic title="Orders" value={1128} />
                </ProCard>
                <ProCard
                    title="Not Shipped Orders"
                    colSpan={responsive ? 0 : 8}
                >
                    <Statistic title="Orders" value={93} />
                </ProCard>
            </ProCard.Group>

            <Typography.Title level={2}>Product Manage</Typography.Title>
            <ProCard.Group
                direction={responsive ? 'column' : 'row'}
                gutter={[16, 16]}
                extra={
                    <Link
                        href="/admin/products"
                    >
                        View All
                    </Link>
                }
            >
                <ProCard
                    title="All Products"
                    colSpan={responsive ? 0 : 8}
                >
                    <Statistic title="Cnt" value={115} />
                </ProCard>

                <ProCard
                    title="Instock"
                    colSpan={responsive ? 0 : 8}
                >
                    <Statistic title="Product" value={78} />
                </ProCard>
            </ProCard.Group>

            <Typography.Title level={2}>Rewards</Typography.Title>
            <ProCard.Group
                direction={responsive ? 'column' : 'row'}
                gutter={[16, 16]}
                extra={
                    <Link
                        href="/admin/rewards"
                    >
                        View All
                    </Link>
                }
            >
                <ProCard
                    title="Total Points"
                    colSpan={responsive ? 0 : 8}
                >
                    <Statistic title="Pts." value={3249} />
                </ProCard>

                <ProCard
                    title="Completed Redeems"
                    colSpan={responsive ? 0 : 8}
                >
                    <Statistic title="Orders" value={28} />
                </ProCard>
                <ProCard
                    title="Not Shipped Orders"
                    colSpan={responsive ? 0 : 8}
                >
                    <Statistic title="Orders" value={16} />
                </ProCard>
            </ProCard.Group>

        </PageContainer>
    );
};

export default Page;
