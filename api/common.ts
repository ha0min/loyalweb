import { BaseResponse } from '@/store/types/type';

export const fetcher =
    async <TData>(url: string, method: string, params: Record<string, any>): Promise<TData> => {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: method === 'GET' ? null : JSON.stringify(params),
    });

    const result: BaseResponse<TData> = await response.json();
    console.log(`${method} ${url} result`, result);

    if (!response.ok) {
        throw new Error(`An error occurred while fetching the data, with status code ${response.status}`);
    }
    if (result.code !== 0) {
        console.log(`${method} ${url} error`, result.code, result.message);
        throw new Error(`${result.code}`);
    }
    return result.data;
};
