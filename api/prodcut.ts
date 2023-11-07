import useSWR from 'swr';
import { ProductDetail } from '@/type';
import { BaseResponse } from '@/store/types/type';

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

export type ProductListResponse = BaseResponse<ProductListData>;

const fetcher = async <TData>(url: string, params: Record<string, any>): Promise<TData> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });

    const result: BaseResponse<TData> = await response.json();
    console.log('result', result);

    if (!response.ok) {
        throw new Error(`An error occurred while fetching the data, with status code ${response.status}`);
    }
    if (result.code !== 0) {
        throw new Error(`Failed to fetch data with code ${result.code} and message ${result.message}`);
    }
    return result.data;
};
export const useProductList = (props:ProductListRequest) => {
    const key = JSON.stringify(['/api/product/list/page/vo', props]);

    const { data, error } = useSWR<ProductListData, Error>(
        key,
        () => fetcher<ProductListData>('/api/product/list/page/vo',
            props),
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
            props),
    );

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};
