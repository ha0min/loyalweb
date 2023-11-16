'use client';

import { Container, Title, Text, Paper, Image, ThemeIcon, SimpleGrid, Flex, Grid } from '@mantine/core';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';
import {Result, Skeleton} from 'antd';
import { useCurrentUser } from '@/api/user';
import { RewardRecord } from '@/type';
import { useUserRewardsHistory } from '@/api/rewards';

// Mock data from the server

const RewardsHistoryPage = () => {
    const {
        currentUser,
        isCurrentUserLoading,
        currentError,
    } = useCurrentUser();

    const {
        isLoading,
        isError,
        data,
    } = useUserRewardsHistory({
        current: 1,
        pageSize: 200,
    });

    const rewardsByMonth = useMemo(() => {
        if (!data) {
            return [];
        }

        const { records } = data;

        records.sort((a, b) => dayjs(a.createTime)
            .isBefore(dayjs(b.createTime)) ? 1 : -1);

        const groupedByMonth: { [key: string]: RewardRecord[] } = {};

        records.forEach(record => {
            const month = dayjs(record.createTime)
                .format('MMM, YYYY');
            if (!groupedByMonth[month]) {
                groupedByMonth[month] = [];
            }
            groupedByMonth[month].push(record);
        });

        const result = Object.keys(groupedByMonth)
            .map(month => ({
                month,
                records: groupedByMonth[month],
                totalEarned: groupedByMonth[month].reduce(
                    (acc, record) => acc + (Number(record.points) > 0
                        ? Number(record.points) : 0),
                    0
                ),
                totalUsed:
                    groupedByMonth[month].reduce(
                        (acc, record) => acc + (Number(record.points) < 0
                            ? Number(record.points) : 0),
                        0
                    ),
            }));

        console.log(result);

        return result;
    }, [data]);

    //TODO: add currentError handler
    // if (isError || currentError) {

    if (isError) {
        return (
            <Result
                status="error"
                title="Oops, something went wrong"
                subTitle={`Error: ${isError}`}
            />
        );
    }

    return (
        <Container p="md">
            <Flex
                justify="flex-start"
                align="center"
                gap="md"
                my="md"
            >
                <Image
                    src="https://em-content.zobj.net/source/telegram/358/magnifying-glass-tilted-right_1f50e.webp"
                    alt="Check your rewards history"
                    w={80}
                    h={80}
                    radius="lg"
                />

                <div>
                    <Title>Let&apos;s celebrate your loyalty!</Title>
                    <Skeleton loading={currentUser !== null || isLoading} active>
                        <Text fw={500} size="lg">You currently have: {currentUser?.points} points.</Text>
                    </Skeleton>
                </div>
            </Flex>

            <Skeleton
                loading={isCurrentUserLoading || isLoading}
                active
            >
                {rewardsByMonth.map((monthGroup) => (
                    <Paper withBorder shadow="md" p="md" radius="md" mt="md" key={monthGroup.month}>
                        <Title order={3}>{monthGroup.month}</Title>
                        <Text>Earned this month: {monthGroup.totalEarned}</Text>
                        <Text>Used this month: {monthGroup.totalUsed}</Text>
                        <SimpleGrid cols={1} mt="md">
                            {monthGroup.records.map((record, index) => (
                                <Grid
                                    justify="space-around"
                                    p="md"
                                    key={record.id}
                                    grow
                                    bg={index % 2 === 0 ? 'var(--mantine-primary-color-light)' : ''}
                                >
                                    <Grid.Col span={6}>
                                        <Text>
                                            {dayjs(record.createTime)
                                                .format('DD/MMM/YYYY')}
                                        </Text>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Flex gap="xs">
                                            <ThemeIcon color={record.points > 0 ? 'green' : 'red'} variant="light">
                                                {record.points > 0
                                                    ? <IconArrowUpRight size={16} /> :
                                                    <IconArrowDownRight size={16} />
                                                }
                                            </ThemeIcon>
                                            <Text
                                                c={record.points > 0 ? 'green' : 'red'}
                                            >
                                                {record.points} points
                                            </Text>
                                        </Flex>
                                    </Grid.Col>
                                </Grid>
                            ))}
                        </SimpleGrid>
                    </Paper>
                ))}
            </Skeleton>
        </Container>
    );
};

export default RewardsHistoryPage;
