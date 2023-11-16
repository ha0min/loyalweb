'use client';

import { PageContainer } from '@ant-design/pro-layout';
import { ProTable } from '@ant-design/pro-table';
import { useOrdersList } from '@/api/orders';

const AnalysisTab = () => {
    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Order Date',
            dataIndex: 'order_date',
            key: 'order_date',
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status',
            key: 'order_status',
        },
        {
            title: 'Order Total',
            dataIndex: 'order_total',
            key: 'order_total',
        },
    ];

    return (
        <div>
            Analysis Tab
        </div>
    );
};

const DataTab = () => {
    const getOrder = (params, sort, filter) => {
        console.log(params, sort, filter);
    };

    return (
        <div>
            Data Tab

        </div>
    );
};
const Page = () => (
        <PageContainer
            header={{
                title: 'Orders',
                ghost: true,
                breadcrumb: {},
            }}
        >
            <DataTab />
        </PageContainer>
    );

export default Page;
