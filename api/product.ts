import useSWR from 'swr';
import { ProductDetail } from '@/type';
import { fetcher } from '@/api/common';

export type ProductListRequest = {
    pageSize: number;
    page: number;
    sortField?: string;
    sortOrder?: string;
    name?: string;
    category?: string;
};

export type ProductListData = {
    total: number;
    records: ProductDetail[];
};

export const useProductList = (props:ProductListRequest) => {
    const key = JSON.stringify(['/api/product/list/page/vo', props]);

    const { data, error } = useSWR<ProductListData, Error>(
        key,
        () => fetcher<ProductListData>('/api/product/list/page/vo', 'POST', props),
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};

export type PointsProductListRequest = {
    pageSize: number;
    page: number;
    sortField?: string;
    sortOrder?: string;
};

export const usePointsProductList = (props:PointsProductListRequest) => {
    const key = JSON.stringify(['/api/reward/list/page/vo', props]);

    const { data, error } = useSWR<ProductListData, Error>(
        key,
        () => fetcher<ProductListData>('/api/reward/list/page/vo',
            'POST',
            props),
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};
