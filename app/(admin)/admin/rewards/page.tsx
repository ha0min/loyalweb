'use client';

import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import {notification, Typography} from 'antd';
import { useRef, useState } from 'react';
import { ProForm, ProFormDigit, ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { Card } from '@mantine/core';
import { ProductListData } from '@/api/product';
import { fetcher } from '@/api/common';
import { ProductDetail } from '@/type';

type PointsProductItem = {
    description: string;
    id: React.Key;
    name: string;
    picture: string;
    points: number;
    stock: number;
};

const columns: ProColumns<PointsProductItem>[] = [
    {
        title: 'Rewards ID',
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
        title: 'Points',
        search: false,
        valueType: 'digit',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: 'Required',
                },
            ],
        },
        dataIndex: 'points',
        key: 'points',
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
            <ProTable<PointsProductItem>
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
                            await fetcher<ProductDetail>('/api/reward/update', 'PUT', row);
                        },
                    }
                }
                request={
                    async (params,
                           sort,
                           filter) => {
                        console.log('prodcuts page request', params, sort, filter);
                        try {
                            const data = await fetcher<ProductListData>('/api/reward/list/page/vo', 'POST', {
                                page: params.current,
                                pageSize: params.pageSize,
                            });

                            console.log(data);
                            const result: PointsProductItem[] = data.records.map((item) => ({
                                description: item.description || '', // Provide default value if undefined
                                id: item.id as React.Key, // Convert number to React.Key
                                name: item.name || '', // Provide default value if undefined
                                picture: item.picture || '', // Provide default value if undefined
                                points: item.points || 0, // Provide default value if undefined
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

type PointsProductFormItems = {
    name: string;
    picture: string;
    points: number;
    stock: number;
    category: string;
    description: string;
};

const AddProduct = () => {
    const formRef = useRef<
        ProFormInstance<PointsProductFormItems>
    >();

    return (
        <Card>
            <ProForm<PointsProductFormItems>
                onFinish={async (values) => {
                    console.log('add product form values', values);
                    await fetcher<ProductDetail>('/api/reward/add', 'POST', values);
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
                    points: 0,
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
                <ProFormDigit
                    label="Points"
                    name="points"
                    fieldProps={{ precision: 0 }}
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
            </ProForm>
        </Card>
    );
};

const Page = () => {
    const [activeTab, setActiveTab] = useState('rewardsList');
    return (
        <div>
            <PageContainer
                header={{
                    title: 'Rewards Management',
                }}
                tabList={[
                    {
                        tab: 'Rewards List',
                        key: 'rewardsList',
                    },
                    {
                        tab: 'Add Reward',
                        key: 'addReward',
                    },
                ]}
                tabActiveKey={activeTab}
                onTabChange={(key) => {
                    setActiveTab(key);
                }}
            >
                {activeTab === 'rewardsList' && <ProductTable />}
                {activeTab === 'addReward' && <AddProduct />}
            </PageContainer>
        </div>
    );
};

export default Page;
