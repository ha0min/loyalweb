'use client';

import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import {notification, Typography} from 'antd';
import { useRef, useState } from 'react';
import { ProForm, ProFormDigit, ProFormInstance, ProFormMoney, ProFormText } from '@ant-design/pro-form';
import { Card } from '@mantine/core';
import { ProductListData } from '@/api/product';
import { fetcher } from '@/api/common';
import { ProductDetail } from '@/type';

type ProductItem = {
    category: string;
    description: string;
    id: React.Key;
    name: string;
    picture: string;
    price: number;
    stock: number;
};

const columns: ProColumns<ProductItem>[] = [
    {
        title: 'Product ID',
        search: false,
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: 'Required',
                },
            ],
        },
        key: 'name',
    },
    {
        title: 'Price',
        search: false,
        valueType: 'money',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: 'Required',
                },
            ],
        },
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        valueType: 'digit',
        key: 'stock',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: 'Required',
                },
            ],
        },

        search: false,

    },
    {
        title: 'Category',
        dataIndex: 'category',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: 'Required',
                },
            ],
        },

        key: 'category',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        hideInTable: true,
        key: 'description',
        disable: true,
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: 'Required',
                },
            ],
        },

        search: false,
    },
    {
        title: 'Picture',
        dataIndex: 'picture',
        key: 'picture',
        search: false,
    },
    {
        title: 'Operation',
        valueType: 'option',
        width: 200,
        render: (text, record, _, action) => [
            <Typography.Link
                key="editable"
                onClick={() => {
                    console.log(record);
                    console.log(action);
                    console.log(action?.startEditable);
                    action?.startEditable?.(record.id);
                }}
            >
                Edit
            </Typography.Link>,
        ],
    },
];

const ProductTable = () => {
    const actionRef = useRef<ActionType>();

    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

    return (
        <div>
            <ProTable<ProductItem>
                rowKey="id"
                cardBordered
                actionRef={actionRef}
                locale={{
                    emptyText: 'No Data',
                }}
                columns={columns}
                editable={
                    {
                        editableKeys,
                        onChange: setEditableRowKeys,
                        type: 'single',
                        onSave: async (key, row) => {
                            console.log(key, row);
                            await fetcher<ProductDetail>('/api/product/update', 'PUT', row);
                        },
                    }
                }
                request={
                    async (params,
                           sort,
                           filter) => {
                        console.log('prodcuts page request', params, sort, filter);
                        try {
                            const data = await fetcher<ProductListData>('/api/product/list/page/vo', 'POST', {
                                page: params.current,
                                pageSize: params.pageSize,
                            });

                            console.log(data);
                            const result: ProductItem[] = data.records.map((item) => ({
                                category: item.category || '', // Provide default value if undefined
                                description: item.description || '', // Provide default value if undefined
                                id: item.id as React.Key, // Convert number to React.Key
                                name: item.name || '', // Provide default value if undefined
                                picture: item.picture || '', // Provide default value if undefined
                                price: item.price || 0, // Provide default value if undefined
                                stock: item.stock || 0, // Provide default value if undefined
                            }));
                            return {
                                data: result,
                                total: data.total,
                                success: true,
                            };
                        } catch (error) {
                            console.error('Error fetching data:', error);
                            // Return a rejected promise or an object with success set to false
                            return Promise.reject(error);
                        }
                    }
                }
            />
        </div>
    );
};

type ProductFormItems = {
    name: string;
    picture: string;
    price: number;
    stock: number;
    category: string;
    description: string;
};

const AddProduct = () => {
    const formRef = useRef<
        ProFormInstance<ProductFormItems>
    >();

    return (
        <Card>
            <ProForm<ProductFormItems>
                onFinish={async (values) => {
                    console.log('add product form values', values);
                    await fetcher<ProductDetail>('/api/product/add', 'POST', values);
                    notification.success({
                        message: 'Success',
                        description: 'Product added successfully',
                    });
                    formRef.current?.resetFields();
                }}
                formRef={formRef}
                layout="horizontal"
                labelCol={{ span: 4 }}
                initialValues={{
                    name: '',
                    price: 0,
                    stock: 0,
                    category: '',
                    description: '',
                }}
            >
                <ProFormText
                    width="md"
                    name="name"
                    label="Name"
                    placeholder="Please enter product name"
                    rules={[
                        {
                            required: true,
                            message: 'Required',
                        },
                    ]}
                />
                <ProFormText
                    width="md"
                    name="picture"
                    label="Picture"
                    placeholder="Please enter product picture"
                    rules={[
                        {
                            required: true,
                            message: 'Required',
                        },
                    ]}
                />
                <ProFormMoney
                    label="Price"
                    name="price"
                    fieldProps={{ precision: 2 }}
                    locale="en-US"
                    rules={[
                        {
                            required: true,
                            message: 'Required',
                        },
                    ]}
                    min={0}
                />
                <ProFormDigit
                    width="md"
                    name="stock"
                    label="Stock"
                    placeholder="Please enter product stock"
                    rules={[
                        {
                            required: true,
                            message: 'Required',
                        },
                    ]}
                    min={1}
                />
                <ProFormText
                    width="md"
                    name="description"
                    label="Description"
                    placeholder="Please enter product description"
                    rules={[
                        {
                            required: true,
                            message: 'Required',
                        },
                    ]}
                />
                <ProFormText
                    width="md"
                    name="category"
                    label="Category"
                    placeholder="Please enter product category"
                    rules={[
                        {
                            required: true,
                            message: 'Required',
                        },
                    ]}
                />
            </ProForm>
        </Card>
    );
};

const Page = () => {
    const [activeTab, setActiveTab] = useState('producttable');
    return (
        <div>
            <PageContainer
                header={{
                    title: 'Products Management',
                }}
                tabList={[
                    {
                        tab: 'Product Table',
                        key: 'producttable',
                    },
                    {
                        tab: 'Add Product',
                        key: 'add',
                    },
                ]}
                tabActiveKey={activeTab}
                onTabChange={(key) => {
                    setActiveTab(key);
                }}
            >
                {activeTab === 'producttable' && <ProductTable />}
                {activeTab === 'add' && <AddProduct />}
            </PageContainer>
        </div>
    );
};

export default Page;
