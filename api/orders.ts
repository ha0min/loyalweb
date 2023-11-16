import useSWR from 'swr';
import { fetcher } from '@/api/common';
import { Order, OrderDetail } from '@/store/types/type';

type OrderListRequest = {
    pageSize: number;
    current: number;
    sortField?: string;
    sortOrder?: string;
};

type OrderListData = {
    total: number;
    records: Order[];
};

export const useOrdersList = (props: OrderListRequest) => {
    const key = JSON.stringify(['/api/orders/list/page/vo', props]);

    const {
        data,
        error,
    } = useSWR<OrderListData, Error>(
        key,
        () => fetcher<OrderListData>('/api/orders/list/page/vo', 'POST', props),
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};

export const useOrderDetail = (id: number) => {
    const key = JSON.stringify(['/api/orders/get/vo', id]);
    const {
        data,
        error,
    } = useSWR<Order, Error>(
        key,
        () => fetcher<Order>('/api/orders/get/vo', 'GET', [id]),
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};
