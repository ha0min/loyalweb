import useSWR from 'swr';
import { fetcher } from '@/api/common';
import { Order, OrderDetail } from '@/store/types/type';

type OrderListRequest = {
    pageSize: number;
    page: number;
    sortField?: string;
    sortOrder?: string;
};

type OrderListData = {
    total: number;
    records: Order[];
};

export const useOrdersList = (props: OrderListRequest) => {
    const key = JSON.stringify(['/api/order/list/page/vo', props]);

    const {
        data,
        error,
    } = useSWR<OrderListData, Error>(
        key,
        () => fetcher<OrderListData>('/api/order/list/page/vo', 'POST', props),
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};

export const useOrderDetail = (id: number) => {
    const key = JSON.stringify(['/api/order/get/vo', id]);
    const {
        data,
        error,
    } = useSWR<Order, Error>(
        key,
        () => fetcher<Order>('/api/order/get/vo', 'GET', [id]),
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};
