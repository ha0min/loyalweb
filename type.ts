'use client';

export type ProductDetail = {
    category?: string;
    description?: string;
    id?: number;
    name?: string;
    picture?: string;
    price?: number;
    stock?: number;
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
