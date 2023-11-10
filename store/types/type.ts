'use client';

export type ProductDetail = {
    category?: string;
    description?: string;
    id?: number;
    name?: string;
    picture?: string;
    price?: number;
    stock?: number;
    points?: number;
};

export type User = {
    username?: string,
    email?: string,
    avatar?: string,
    phone?: string,
    address?: string,
    userRole?: string,
    profile?: string,
    points?: number,
};

export interface BaseResponse<TData> {
    code: number;
    data: TData;
    message?: string;
}
