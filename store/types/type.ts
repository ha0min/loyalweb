'use client';

export type ProductDetail = {
    category?: string;
    description?: string;
    id?: string;
    name?: string;
    picture?: string;
    price?: number;
    stock?: number;
    points?: number;
};

export type User = {
    id?: number,
    username?: string,
    email?: string,
    avatar?: string,
    phone?: string,
    address?: string,
    userRole?: string,
    profile?: string,
    points?: number,
};

export type OrderDetail = {
    id?: number,
    productVO?: ProductDetail,
    number?: number,
    amount?: number,
};

export type Order = {
    id?: number,
    userId?: number,
    amount?: number,
    status?: number,
    createTime?: string,
    updateTime?: string,
    remark?: string,
    orderDetailVOList?: OrderDetail[],
};

export interface BaseResponse<TData> {
    code: number;
    data: TData;
    message?: string;
}
